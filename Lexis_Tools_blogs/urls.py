from django.urls import path
from . import views


urlpatterns = [
    path("", view=views.blog_page, name="blog_page"),
    path("<str:slug>/", views.show_blog_page, name="show_blog_page")
]
