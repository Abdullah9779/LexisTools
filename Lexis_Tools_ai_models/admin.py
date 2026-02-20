from django.contrib import admin
from .models import UserLLMConfig, UserTTSConfig, UserTextFormatterPrompt
from unfold.admin import ModelAdmin

from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ImportForm, ExportForm, SelectableFieldsExportForm

# Register your models here.

@admin.register(UserLLMConfig)
class UserLLMConfigAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm
    export_form_class = SelectableFieldsExportForm

    list_display = ('user', 'provider', 'short_model', 'short_api_key')
    list_filter = ('provider', 'model', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email')
    ordering = ('user', 'provider', 'model')
    
    def short_api_key(self, obj):
        if obj.api_key:
            return obj.api_key[:20] + "*****"
        return ""
    short_api_key.short_description = "API Key"
    short_api_key.admin_order_field = 'api_key'
    
    def short_model(self, obj):
        if obj.model:
            return obj.model[:20] + "..."
        return ""
    short_model.short_description = "Model"
    short_model.admin_order_field = 'model'



@admin.register(UserTTSConfig)
class UserTTSConfigAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm
    export_form_class = SelectableFieldsExportForm

    list_display = ('user', 'provider', 'short_model', 'voice_name', 'short_api_key')
    list_filter = ('provider', 'model')
    search_fields = ('user__username', 'user__email')
    ordering = ('user', 'provider', 'model')
    
    def short_api_key(self, obj):
        if obj.api_key:
            return obj.api_key[:20] + "*****"
        return ""
    short_api_key.short_description = "API Key" 
    short_api_key.admin_order_field = 'api_key'
    
    def short_model(self, obj):
        if obj.model:
            return obj.model[:20] + "..."
        return ""

@admin.register(UserTextFormatterPrompt)
class UserTextFormatterPromptAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm
    export_form_class = SelectableFieldsExportForm
    
    list_display = ('user', 'short_prompt_name', 'short_prompt_content')
    list_filter = ('user__username', 'user__email', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email', 'prompt_name')
    ordering = ('user', 'prompt_name')
    
    def short_prompt_content(self, obj):
        if obj.prompt_content:
            return obj.prompt_content[:30] + "..."
        return ""
    short_prompt_content.short_description = "Prompt Content"
    short_prompt_content.admin_order_field = 'prompt_content'
    
    
    def short_prompt_name(self, obj):
        if obj.prompt_name:
            return obj.prompt_name[:15] + "..."
        return ""
    short_prompt_name.short_description = "Prompt"
    short_prompt_name.admin_order_field = 'prompt_name'
