from django.db import models
from django.utils import timezone
import os
import uuid
from accounts.models import User
def product_image_path(instance, filename):
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    ext = filename.split('.')[-1]
    new_filename = f'product_{instance.pk}_{timestamp}_{uuid.uuid4()}.{ext}'
    return os.path.join('product_images', new_filename)

class Category(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to=product_image_path, null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.name
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.CharField(max_length=255, default='pending')
    def __str__(self):
        return self.user.email

