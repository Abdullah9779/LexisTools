from itsdangerous import URLSafeTimedSerializer
from django.conf import settings
import re

def make_verification_link(request, user, path):
    serializer = URLSafeTimedSerializer(settings.SECRET_KEY)
    token = serializer.dumps(user.pk, salt=settings.SERIALIZER_SALT_KEY)
    link = request.build_absolute_uri(f"/{path}/{token}/")
    return link

def is_valid_email(input_string):
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, input_string) is not None

def is_valid_username(username):
    return bool(re.match(r'^[a-zA-Z0-9_-]+$', username))