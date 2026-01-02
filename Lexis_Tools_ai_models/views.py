from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.http import StreamingHttpResponse

from .ai_models.llm.models.translation import LLMTranslation
from .ai_models.llm.models.text import TextFormatter, TextSummarizer
from .ai_models.llm.base import LLMProviderError

from .ai_models.tts import TTSEngine
from .ai_models.tts.utils import pcm_to_wav_base64

from .models import UserLLMConfig, UserTTSConfig, UserTextFormatterPrompt

from .serializer import UserTextFormatterPromptSerializer

from .utils import is_llm_api_key_valid, is_tts_api_key_valid

# Create your views here.

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def translation_ai_model_api(request):
    if request.method == "POST":
        data = request.data
        required_fields = ["text", "source_language", "target_language"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return Response(
                    {"error": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        try:
            llm_data = UserLLMConfig.objects.get(user=request.user)
            provider = llm_data.provider
            model = llm_data.model
            api_key = llm_data.api_key
        except UserLLMConfig.DoesNotExist:
            return Response(
                {"error": "User LLM configuration not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            translator = LLMTranslation(
                provider=provider,
                model=model,
                api_key=api_key,
            )
            
            translation_text = translator.translate_text(
                data.get("text"),
                data.get("target_language"),
            ).strip('"')
            
            response = Response(translation_text, status=status.HTTP_200_OK)
            response['Cache-Control'] = 'no-cache'
            response['X-Accel-Buffering'] = 'no'
            return response
        
        except LLMProviderError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def text_formatter_ai_model_api(request):
    if request.method == "POST":
        data = request.data
        required_fields = ["text", "format_instructions"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return Response(
                    {"error": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        try:
            llm_data = UserLLMConfig.objects.get(user=request.user)
            provider = llm_data.provider
            model = llm_data.model
            api_key = llm_data.api_key
        except UserLLMConfig.DoesNotExist:
            return Response(
                {"error": "User LLM configuration not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            formatter = TextFormatter(
                provider=provider,
                model=model,
                api_key=api_key
            )
            
            formatted_text = formatter.format_text(
                data.get("text"),
                data.get("format_instructions"),
            )
            
            return Response(formatted_text, status=status.HTTP_200_OK)
        
        except LLMProviderError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def text_summarizer_ai_model_api(request):
    if request.method == "POST":
        data = request.data
        required_fields = ["text", "length"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return Response(
                    {"error": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        try:
            llm_data = UserLLMConfig.objects.get(user=request.user)
            provider = llm_data.provider
            model = llm_data.model
            api_key = llm_data.api_key
        except UserLLMConfig.DoesNotExist:
            return Response(
                {"error": "User LLM configuration not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            summarizer = TextSummarizer(
                provider=provider,
                model=model,
                api_key=api_key
            )

            summarized_text = summarizer.summarize_text(
                text=data.get("text"),
                summary_length=data.get("length"),
            )
            return Response(summarized_text, status=status.HTTP_200_OK)

        except LLMProviderError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def save_user_llm_config_api(request):
    if request.method == "POST":
        data = request.data
        required_fields = ["provider", "model_name", "api_key"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return Response(
                    {"error": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        provider = data.get("provider")
        model = data.get("model_name")
        api_key = data.get("api_key")
        
        if not is_llm_api_key_valid(provider=provider, model=model, api_key=api_key):
            return Response({"error": "Invalid API key"}, status=status.HTTP_400_BAD_REQUEST) 
        
        user = request.user
        try:
            user_llm_config = UserLLMConfig.objects.get(user=user)
            user_llm_config.provider = provider
            user_llm_config.model = model
            user_llm_config.api_key = api_key
            user_llm_config.save()
            return Response({"message": "User LLM config updated successfully"}, status=status.HTTP_200_OK)
        except UserLLMConfig.DoesNotExist:
            try:
                user_llm_config = UserLLMConfig.objects.create(
                    user=user,
                    provider=provider,
                    model=model,
                    api_key=api_key
                )
                return Response({"message": "User LLM config saved successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as e:
            return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def save_user_tts_config_api(request):
    if request.method == "POST":
        data = request.data
        required_fields = ["provider", "model", "voice_name", "api_key"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return Response(
                    {"error": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        provider = data.get("provider")
        model = data.get("model")
        voice_name = data.get("voice_name")
        api_key = data.get("api_key")
        
        if not is_tts_api_key_valid(provider=provider, model=model, voice_name=voice_name, api_key=api_key):
            return Response({"error": "Invalid API key"}, status=status.HTTP_400_BAD_REQUEST)   
        
        
        user = request.user
        try:
            user_tts_config = UserTTSConfig.objects.get(user=user)
            user_tts_config.provider = provider
            user_tts_config.model = model
            user_tts_config.voice_name = voice_name
            user_tts_config.api_key = api_key
            user_tts_config.save()
            return Response({"message": "Voice Configuration updated successfully"}, status=status.HTTP_200_OK)
        except UserTTSConfig.DoesNotExist:
            try:
                user_tts_config = UserTTSConfig.objects.create(
                    user=user,
                    provider=provider,
                    model=model,
                    voice_name=voice_name,
                    api_key=api_key
                )
                user_tts_config.save()
                return Response({"message": "Voice Configuration saved successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as e:
            return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def get_user_llm_config_api(request):
    """Get the authenticated user's LLM configuration"""
    try:
        user = request.user
        llm_config = UserLLMConfig.objects.filter(user=user).order_by('-updated_at').first()
        
        if llm_config:
            return Response({
                "provider": llm_config.provider,
                "model": llm_config.model,
                "api_key": llm_config.api_key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No LLM configuration found"}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def get_user_tts_config_api(request):
    """Get the authenticated user's TTS configuration"""
    try:
        user = request.user
        tts_config = UserTTSConfig.objects.filter(user=user).order_by('-updated_at').first()
        
        if tts_config:
            return Response({
                "provider": tts_config.provider,
                "model": tts_config.model,
                "voice_name": tts_config.voice_name,
                "api_key": tts_config.api_key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No TTS configuration found"}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def save_user_text_formatter_prompt_api(request):
    if request.method == "POST":
        data = request.data
        required_fields = ["prompt_name", "prompt_content"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return Response(
                    {"error": f"Missing required field: {field}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        prompt_name = data.get("prompt_name")
        prompt_content = data.get("prompt_content")
        
        user = request.user
        try:
            user_prompt = UserTextFormatterPrompt.objects.create(
                user=user,
                prompt_name=prompt_name,
                prompt_content=prompt_content
            )
            user_prompt.save()
            return Response({"message": "Text Formatter Prompt saved successfully"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def edit_user_text_formatter_prompt_api(request):
    data = request.data
    required_fields = ["prompt_id", "prompt_name", "prompt_content"]
    for field in required_fields:
        if field not in data or not data.get(field):
            return Response(
                {"error": f"Missing required field: {field}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    prompt_id = data.get("prompt_id")
    prompt_name = data.get("prompt_name")
    prompt_content = data.get("prompt_content")
    
    user = request.user
    try:
        user_prompt = UserTextFormatterPrompt.objects.get(id=prompt_id, user=user)
        user_prompt.prompt_name = prompt_name
        user_prompt.prompt_content = prompt_content
        user_prompt.save()
        return Response({"message": "Text Formatter Prompt updated successfully"}, status=status.HTTP_200_OK)
    
    except UserTextFormatterPrompt.DoesNotExist:
        return Response({"error": "Text Formatter Prompt not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def delete_user_text_formatter_prompt_api(request, prompt_id):
    user = request.user
    try:
        user_prompt = UserTextFormatterPrompt.objects.get(id=prompt_id, user=user)
        user_prompt.delete()
        return Response({"message": "Text Formatter Prompt deleted successfully"}, status=status.HTTP_200_OK)
    
    except UserTextFormatterPrompt.DoesNotExist:
        return Response({"error": "Text Formatter Prompt not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([JSONRenderer])
def get_user_text_formatter_prompt_api(request):
    """Get the authenticated user's Text Formatter Prompts"""
    try:
        user = request.user
        prompts = UserTextFormatterPrompt.objects.filter(user=user).order_by('-updated_at')
        
        if prompts.exists():
            serializer = UserTextFormatterPromptSerializer(prompts, many=True)
            data = serializer.data
        
            return Response({"prompts": data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No Text Formatter Prompts found"}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": f"Unexpected error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)