from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.landing_page, name='landing_page'),
    path('sign-up/', view=views.sign_up_page, name='sign_up_page'),
    path('sign-in/', view=views.sign_in_page, name='sign_in_page'),
    path('verify-email/<str:token>/', view=views.verify_email_page, name='verify_email_page'),
    path('translate/', view=views.translation_page, name='translation_page'),
    path('text-summarizer/', view=views.text_summarizer_page, name='text_summarizer_page'),
    path('dashboard/', view=views.dashboard_page, name='dashboard_page'),
    path('privacy-policy/', view=views.privacy_policy_page, name='privacy_policy_page'),
    path('terms-of-service/', view=views.terms_of_service_page, name='terms_of_service_page'),
    path('about/', view=views.about_us_page, name='about_us_page'),

    path('manifest.json', view=views.manifest_view, name='manifest'),
    path('service-worker.js', view=views.service_worker_view, name='service_worker'),
]