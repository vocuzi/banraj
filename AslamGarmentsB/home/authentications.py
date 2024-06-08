# yourapp/authentication.py

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from home.models import Customer,Address

class CustomAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            if '@' in username:
                # Email login
                user = User.objects.get(email=username)
            elif "+" in username:
                # Mobile number login
                customer = Address.objects.get(phone=username)
                user = customer.user.user
            else:
                # Username login
                user = User.objects.get(username=username)
        except (User.DoesNotExist, Customer.DoesNotExist):
            return None

        if user.check_password(password):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
