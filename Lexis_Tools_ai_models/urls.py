from django.urls import path
from . import views

urlpatterns = [
    path('tts/', views.text_to_speech_ai_model_api, name='text_to_speech_ai_model_api'),
    path('translate/', views.translation_ai_model_api, name='translation_ai_model_api'),
    path('text-formatter/', views.text_formatter_ai_model_api, name='text_formatter_ai_model_api'),
    path('text-summarizer/', views.text_summarizer_ai_model_api, name='text_summarizer_ai_model_api'),
    
    path('save-user-llm-config/', views.save_user_llm_config_api, name='save_user_llm_config_api'),
    path('save-user-tts-config/', views.save_user_tts_config_api, name='save_user_tts_config_api'),
    
    path('get-user-llm-config/', views.get_user_llm_config_api, name='get_user_llm_config_api'),
    path('get-user-tts-config/', views.get_user_tts_config_api, name='get_user_tts_config_api'),
    
    path('save-text-formatter-prompt/', views.save_user_text_formatter_prompt_api, name='save_user_text_formatter_prompt_api'),
    path('get-text-formatter-prompt/', views.get_user_text_formatter_prompt_api, name='get_user_text_formatter_prompt_api'),
    path('edit-text-formatter-prompt/', views.edit_user_text_formatter_prompt_api, name='edit_user_text_formatter_prompt_api'),
    path('delete-text-formatter-prompt/<int:prompt_id>/', views.delete_user_text_formatter_prompt_api, name='delete_user_text_formatter_prompt_api'),
]
