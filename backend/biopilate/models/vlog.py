from django.db import models
from django.utils.html import mark_safe



class CategoryVlog(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = "category vlogs"
    def __str__(self):
        return self.name
       
class Vlog(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title = models.CharField('Titre',max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='vlogs_images/')
    category = models.ForeignKey(CategoryVlog, on_delete=models.CASCADE, blank=True, null=True, related_name='category')
    date=models.DateField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    

    class Meta:
        
        verbose_name_plural = "biopilates vlogs"

    def __str__(self):
        return self.title

