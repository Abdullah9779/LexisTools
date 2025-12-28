"""
URL configuration for Lexis_Tools project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
# from django.shortcuts import redirect

urlpatterns = [
    path('api/', include('Lexis_Tools_apis.urls')),
    path('blog/', include('Lexis_Tools_blogs.urls')),
    path('admin/', admin.site.urls),
    path('sitemap.xml', TemplateView.as_view(template_name="sitemap.xml", content_type="application/xml")),
    path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),
    # path('favicon.ico', lambda request: redirect("/static/favicons/favicon.ico")),
    path('', include('Lexis_Tools_pages.urls')),
]

handler404 = 'Lexis_Tools_pages.views.page_not_found_view'
