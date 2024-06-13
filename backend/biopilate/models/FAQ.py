from django.db import models
class FAQ(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title= models.CharField('Titre',max_length=255)
    description= models.TextField()
    range=models.IntegerField(default='1')
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')


    

    class Meta:
       
        verbose_name_plural = "FAQ"

    def __str__(self):
        return self.title


   

