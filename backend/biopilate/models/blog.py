from django.db import models
from django.utils.html import mark_safe
class Blog(models.Model):
  STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
        ]
  title = models.CharField('Titre',max_length=255)
  author = models.CharField( 'Nom de l’écrivain', max_length=100)  
  description = models.TextField()
  favorites = models.IntegerField()
  image_1 = models.ImageField(upload_to='blog_images/')  #  upload path
  image_2 = models.ImageField(upload_to='blog_images/')  
  full_text = models.TextField()
  date = models.DateField()
  range=models.IntegerField(default='1')
  create_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  status = models.CharField('Status', max_length=10, choices=STATUS_CHOICES, default='pending')
  def __str__(self):
        return self.title
  def admin_image(self):
        if self.image_1:
            return mark_safe('<img src="%s" width="150" height="150" />' % self.image_1.url)
        elif self.image_2:
            return mark_safe('<img src="%s" width="150" height="150" />' % self.image_2.url)
        else:
            return 'No Image'

  admin_image.short_description = 'Image'
  admin_image.allow_tag=True
  class Meta:
        verbose_name_plural = "Blog"