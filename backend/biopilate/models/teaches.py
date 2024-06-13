from django.db import models
from django.utils.html import mark_safe
class Teaches(models.Model):
    fullname=models.CharField('Prénom et Nom')
    image = models.ImageField(upload_to='teacher_images/')  #  upload path
    email = models.EmailField("Email", max_length=254)
    nomber_phone=models.IntegerField("numéro téléphone")
    specialite= models.CharField('spécialité')
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def admin_image(self):
        if self.image:
            return mark_safe('<img src="%s" width="150" height="150" />' % self.image.url)
        
        else:
            return 'No Image'

    admin_image.short_description = 'Image'
    admin_image.allow_tag=True

    class Meta:
        
        verbose_name_plural = "Teaches"

    def __str__(self):
        return self.fullname

    
