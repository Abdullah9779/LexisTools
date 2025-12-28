from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status

from django.core.cache import cache
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.contrib.auth import update_session_auth_hash, authenticate, login, logout

from .utils import make_verification_link, is_valid_email, is_valid_username

# Create your views here.


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def sign_up_api(request):
    if request.method == 'POST':
        data = request.data
        required_fields = ["first_name", "last_name", "username", "email", "password", "confirm_password"]
        for field in required_fields:
            if not data.get(field):
                return Response({"error": f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=data.get("email")).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=data.get("username")).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if data.get("password") != data.get("confirm_password"):
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                username=data.get("username"),
                email=data.get("email"),
                password=data.get("password"),
            )
            user.is_active = False
            verification_link = make_verification_link(request, user, "verify-email")
            
            html_content = render_to_string('emails/verify_email.html', {'verification_link': verification_link})
            
            msg = EmailMultiAlternatives(
                "Verify your email address",
                f"Click the link to verify: {verification_link}",
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=False)
            user.save()

            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def send_email_verification_link_api(request):
    if request.method == 'POST':
        data = request.data

        required_fields = ["email"]
        for field in required_fields:
            if not data.get(field):
                return Response({"error": f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)

        if cache.get(data.get("email")):
            return Response({"error": "Verification link already sent"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=data.get("email"))
            if user.is_active:
                return Response({"error": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)
            verification_link = make_verification_link(request, user, "verify-email")
            
            html_content = render_to_string('emails/verify_email.html', {'verification_link': verification_link})
            
            msg = EmailMultiAlternatives(
                "Verify your email address",
                f"Click the link to verify: {verification_link}",
                settings.DEFAULT_FROM_EMAIL,
                [user.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=True)
            cache.set(data.get("email"), True, 60 * 60, )
            return Response({"message": "Verification link sent successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def sign_in_api(request):
    if request.method == 'POST':
        data = request.data
        required_fields = ["email_or_username", "password"]
        for field in required_fields:
            if not data.get(field):
                return Response({"error": f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        email_or_username = data.get("email_or_username")
        password = data.get("password")

        user = None
        if is_valid_email(email_or_username):
            try:
                user_obj = User.objects.filter(email=email_or_username).first()
                if user_obj:
                    user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
            
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        elif is_valid_username(email_or_username):
            user = authenticate(request, username=email_or_username, password=password)
            
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            if user.is_active:
                login(request, user)
                return Response({
                    "message": "Sign in successful",
                    "user": {
                        "full_name": user.get_full_name(),
                        "username": user.username,
                        "email": user.email
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User is not active"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


def sign_out_api(request):
    logout(request)
    return redirect("landing_page")

@api_view(["POST"]) 
@renderer_classes([JSONRenderer])
def edit_user_profile_api(request):
    if request.method == 'POST':
        data = request.data
        required_fields = ["first_name", "last_name", "username"]
        for field in required_fields:
            if not data.get(field):
                return Response({"error": f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)

        username = data.get("username")
        
        if request.user.username != username:
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=request.user.id)
            user.first_name = data.get("first_name")
            user.last_name = data.get("last_name")
            user.username = username
            user.save()

            return Response({"message": "User profile updated successfully", "profile_data": {"full_name": user.first_name + " " + user.last_name, "username": user.username, "email": user.email}}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def change_user_password_api(request):
    if request.method == 'POST':
        data = request.data
        required_fields = ["old_password", "new_password", "confirm_password"]
        for field in required_fields:
            if not data.get(field):
                return Response({"error": f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)

        if data.get("new_password") != data.get("confirm_password"):
            return Response({"error": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=request.user.id)
            if not user.check_password(data.get("old_password")):
                return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(data.get("new_password"))
            user.save()
            update_session_auth_hash(request, user)

            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
