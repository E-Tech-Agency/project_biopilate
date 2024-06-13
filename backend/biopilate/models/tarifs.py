from django.db import models
class Tarifs(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]

    description  = models.CharField('Titre',max_length=255)
    price=models.IntegerField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    validete=models.CharField('Validité ',max_length=10)


    class Meta:
       
        verbose_name_plural = "Tarifs"

    def __str__(self):
        return self.description

    
