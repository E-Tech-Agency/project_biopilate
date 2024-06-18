from django.db import models
class Category(models.Model):
    name = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name 
class Planning(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
    title = models.CharField('Titre',max_length=255)
    duree = models.CharField('durée ',max_length=255,blank=True, null=True,)
    description = models.TextField(blank=True, null=True)
    range=models.IntegerField(default='1')
    status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True, related_name='category')
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)     
   

    

    class Meta:
        
        verbose_name_plural = "Plannings"

    def __str__(self):
        return self.title

  
