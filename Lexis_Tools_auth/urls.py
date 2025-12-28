from django.urls import path
from . import views

urlpatterns = [
    path("sign-up/", views.sign_up_api, name="sign_up_api"),
    path("sign-in/", views.sign_in_api, name="sign_in_api"),
    path("sign-out/", views.sign_out_api, name="sign_out_api"),
    path("send-email-verification-link/", views.send_email_verification_link_api, name="send_email_verification_link_api"),
    path("edit-user-profile/", views.edit_user_profile_api, name="edit_user_profile_api"),
    path("change-user-password/", views.change_user_password_api, name="change_user_password_api"),
]