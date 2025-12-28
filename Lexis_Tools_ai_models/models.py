from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from django.conf import settings

class UserLLMConfig(models.Model):          
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_config')
    provider = models.CharField(max_length=10, choices=settings.LLM_PROVIDER_CHOICES, default='GOOGLE')
    model = models.CharField(max_length=100)
    api_key = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        """Ensure the selected model belongs to the selected provider."""
        if self.model and self.provider:
            allowed_models = settings.LLM_MODEL_CHOICES.get(self.provider, [])
            if self.model not in allowed_models:
                raise ValidationError({
                    'model': f"Selected model '{self.model}' is not valid for provider '{self.provider}'."
                })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.provider} - {self.model}"


class UserTTSConfig(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_tts_config')
    provider = models.CharField(max_length=10, choices=settings.TTS_PROVIDER_CHOICES, default='GOOGLE')
    model = models.CharField(max_length=100)
    voice_name = models.CharField(max_length=100)
    api_key = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # Validate model
        if self.model and self.provider:
            allowed_models = settings.TTS_MODEL_CHOICES.get(self.provider, [])
            if self.model not in allowed_models:
                raise ValidationError({
                    'model': f"Selected model '{self.model}' is not valid for provider '{self.provider}'."
                })
        # Validate voice_name
        if self.voice_name and self.provider:
            allowed_voices = settings.TTS_VOICE_NAME_CHOICES.get(self.provider, [])
            if self.voice_name not in allowed_voices:
                raise ValidationError({
                    'voice_name': f"Selected voice '{self.voice_name}' is not valid for provider '{self.provider}'."
                })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.provider} - {self.model} - {self.voice_name}"
    
    
class UserTextFormatterPrompt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_text_formatter_prompt')
    prompt_name = models.CharField(max_length=100)
    prompt_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.prompt_name}"