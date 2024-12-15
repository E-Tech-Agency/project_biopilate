from django.db import models
from django.utils.html import mark_safe



       
class FinancerFormation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title = models.CharField('Titre',max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='financer_formation_images/')
    pdf_financer_formation = models.FileField(upload_to='financer_formation_pdfs/', blank=True, null=True)  

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    

    class Meta:
        
        verbose_name_plural = "biopilates financer votre formation"

    def __str__(self):
        return self.title

