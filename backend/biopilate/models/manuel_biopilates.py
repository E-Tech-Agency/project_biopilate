from django.db import models
from django.utils.html import mark_safe
     
class Manuel(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title = models.CharField('Titre',max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='formation_extrnal_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    

    class Meta:
        
        verbose_name_plural = "biopilates Manuel"

    def __str__(self):
        return self.title

