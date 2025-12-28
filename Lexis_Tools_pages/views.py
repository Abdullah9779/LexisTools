from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.contrib.auth.models import User

from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from pathlib import Path

import json
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature

serializer = URLSafeTimedSerializer(settings.SECRET_KEY)

# Create your views here.

with open("/home/lexistools/Lexis_Tools/blogs.json") as file:
    blogs = json.load(file)

def landing_page(request):
    return render(request, 'landing_page.html')

def privacy_policy_page(request):
    return render(request, 'privacy_policy_page.html')

def terms_of_service_page(request):
    return render(request, 'terms_of_service_page.html')

def about_us_page(request):
    return render(request, 'about_us_page.html')

def sign_up_page(request):
    if request.user.is_authenticated:
        return redirect('dashboard_page')
    return render(request, 'sign_up_page.html')

def sign_in_page(request):
    if request.user.is_authenticated:
        return redirect('dashboard_page')
    return render(request, 'sign_in_page.html')

@login_required(login_url='sign_in_page')
def translation_page(request):
    return render(request, 'translation_page.html')

@login_required(login_url='sign_in_page')
def text_summarizer_page(request):
    return render(request, 'text_summarizer_page.html')


@login_required(login_url='sign_in_page')
def dashboard_page(request):
    context = {
        'llm_providers': settings.LLM_PROVIDER_CHOICES,
        'llm_models': settings.LLM_MODEL_CHOICES,
        'tts_providers': settings.TTS_PROVIDER_CHOICES,
        'tts_models': settings.TTS_MODEL_CHOICES,
        'tts_voices': settings.TTS_VOICE_NAME_CHOICES,
        'blogs': blogs
    }
    return render(request, 'dashboard_page.html', context)

def verify_email_page(request, token):
    context = {"message": "", "status": ""}

    try:
        user_id = serializer.loads(
            token,
            salt=settings.SERIALIZER_SALT_KEY,
            max_age=3600
        )
    except SignatureExpired:
        context["message"] = "The verification link has expired."
        context["status"]  = "Expired"
        return render(request, "verify_email_page.html", context)

    except BadSignature:
        context["message"] = "The verification link is invalid."
        context["status"]  = "Invalid"
        return render(request, "verify_email_page.html", context)

    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        context["message"] = "User does not exist."
        context["status"]  = "Invalid"
        return render(request, "verify_email_page.html", context)

    if not user.is_active:
        user.is_active = True
        user.save()
        context["message"] = "Your email has been successfully verified."
        context["status"]  = "Success"
    else:
        context["message"] = "Your email is already verified."
        context["status"]  = "Already Verified"

    return render(request, "verify_email_page.html", context)

def page_not_found_view(request, exception):
    return render(request, '404_page.html', status=404)


@require_http_methods(['GET'])
def manifest_view(request):
    """Serve manifest.json with correct MIME type"""
    manifest_path = Path(settings.BASE_DIR) / 'static' / 'manifest.json'

    with open(manifest_path, 'r') as f:
        manifest_data = json.load(f)

    response = HttpResponse(
        json.dumps(manifest_data),
        content_type='application/manifest+json'
    )
    return response


@require_http_methods(['GET'])
def service_worker_view(request):
    """Serve service-worker.js with correct headers for PWA"""
    sw_path = Path(settings.BASE_DIR) / 'static' / 'js' / 'service-worker.js'

    with open(sw_path, 'r') as f:
        sw_content = f.read()

    response = HttpResponse(sw_content, content_type='application/javascript')
    # Allow service worker to control the entire site
    response['Service-Worker-Allowed'] = '/'
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response


