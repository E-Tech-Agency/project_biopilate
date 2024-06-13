from django.db import models
from .teaches import Teaches
from django.utils.html import mark_safe
class Services (models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title = models.CharField('Titre',max_length=255)
    image = models.ImageField(upload_to='images/')  #  upload path
    description = models.TextField()
    full_text = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    instructeur = models.ForeignKey(Teaches, on_delete=models.CASCADE, blank=True, null=True ,related_name='instructeur')
    def admin_image(self):
        if self.image:
            return mark_safe('<img src="%s" width="150" height="150" />' % self.image.url)
        
        else:
            return 'No Image'

    admin_image.short_description = 'Image'
    admin_image.allow_tag=True

    class Meta:
       
        verbose_name_plural ="Services"

    def __str__(self):
        return self.title

