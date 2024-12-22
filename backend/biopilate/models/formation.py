from django.db import models

class Formation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
    ]
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Formations"


class FormationCategory(models.Model):
    formation = models.ForeignKey(Formation, on_delete=models.CASCADE, related_name='categories')
    option = models.ForeignKey('Option', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Option(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
