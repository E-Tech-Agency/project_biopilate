from django.db import models
from django.contrib.auth.models import AbstractUser,PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manger import UserManager
from rest_framework_simplejwt.tokens import RefreshToken
# Create your models here.
AUTH_PROVIDERS = {
    'email':'email',
    'google':'google',
}
class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(verbose_name=_('Email Address'), max_length=255, unique=True)
    first_name = models.CharField(verbose_name=_('First Name'), max_length=100)
    last_name = models.CharField(verbose_name=_('Last Name'), max_length=100)
    is_staff = models.BooleanField(default=False)
    is_client = models.BooleanField(default=True)
    is_supplier = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=100,default=AUTH_PROVIDERS['email'])

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']
    objects = UserManager()

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
    
    def tokens(self):
        refresh_token = RefreshToken.for_user(self)
        return{
            'refresh_token': str(refresh_token),
            'access_token': str(refresh_token.access_token),
        }


class OneTimePassword(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code=models.CharField(max_length=6,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(null=True,blank=True)
    
    def __str__(self):
        return self.code