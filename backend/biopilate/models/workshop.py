from django.db import models
from django.utils.html import mark_safe



class CategoryWorkShop(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = "category workshops"
    def __str__(self):
        return self.name
       
class WorkShop(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title = models.CharField('Titre',max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='workshop_images/')
    category = models.ForeignKey(CategoryWorkShop, on_delete=models.CASCADE, blank=True, null=True, related_name='category')
    pdf_workshop = models.FileField(upload_to='workshop_pdfs/', blank=True, null=True)  

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    

    class Meta:
        
        verbose_name_plural = "biopilates WorkShops"

    def __str__(self):
        return self.title

