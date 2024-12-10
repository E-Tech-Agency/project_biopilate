from django.db import models
from django.utils.html import mark_safe
from .tages import Tages


class CategoryCours(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "category Cours"

    def __str__(self):
        return self.name


class Cours(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
    ]
    title = models.CharField('Titre', max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='cours_images/')  # upload path
    category = models.ForeignKey(
        CategoryCours, on_delete=models.CASCADE, blank=True, null=True, related_name='category')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10,
                              choices=STATUS_CHOICES, default='pending')
    tages = models.ManyToManyField(Tages, related_name='tages', blank=True)

    class Meta:

        verbose_name_plural = "biopilates Cours"

    def __str__(self):
        return self.title
