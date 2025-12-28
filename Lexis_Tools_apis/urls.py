from django.urls import path, include

urlpatterns = [
    path('auth/', include('Lexis_Tools_auth.urls')),
    path('ai-models/', include('Lexis_Tools_ai_models.urls')),
]