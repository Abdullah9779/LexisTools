from django.shortcuts import render, redirect
import json

with open("/home/lexistools/Lexis_Tools/blogs.json") as file:
    blogs = json.load(file)

def blog_page(request):
    return render(request, "blogs/blog_page.html", {"blogs": blogs})

def show_blog_page(request, slug):
    if slug == "how-to-get-google-gemini-api":
        return render(request, "blogs/gemini_setup_guide.html")

    elif slug == "how-to-get-groq-api":
        return render(request, "blogs/groq_setup_guide.html")

    else:
        return redirect("blog_page")




