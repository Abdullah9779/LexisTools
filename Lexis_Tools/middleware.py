from django.shortcuts import render


class AdminPanalSecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/admin/'):
            if not request.user.is_authenticated or not request.user.is_staff:
                return render(request, "404_page.html", status=404)

        response = self.get_response(request)
        return response