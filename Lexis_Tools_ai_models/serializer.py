from rest_framework.serializers import ModelSerializer
from .models import UserTextFormatterPrompt

class UserTextFormatterPromptSerializer(ModelSerializer):
    class Meta:
        model = UserTextFormatterPrompt
        fields = ['id', 'prompt_name', 'prompt_content', 'created_at', 'updated_at']

