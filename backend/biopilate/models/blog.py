from django.db import models
from django.utils.html import mark_safe
from .tages import Tages


class Blog(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente de publication'),
        ('approved', 'Publiée'),
    ]
    title = models.CharField('Titre', max_length=255)
    author = models.CharField('Nom de l’écrivain', max_length=100)
    description = models.TextField()
    favorites = models.IntegerField(blank=True,default=0)
    image_1 = models.ImageField(
        'Image de coverture ', upload_to='blog_images/')  # upload path
    image_2 = models.ImageField('Image de blog', upload_to='blog_images/')
    full_text = models.TextField()
    date = models.DateField()
    range = models.IntegerField(default=1)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tages_blog = models.ManyToManyField(
        Tages, related_name='tages_blog', blank=True,db_table='biopilate_blog_tages')
    status = models.CharField('Status', max_length=10,
                              choices=STATUS_CHOICES, default='pending')
    view = models.IntegerField(default=0)

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
    admin_image.allow_tags = True

    class Meta:
        verbose_name_plural = "Blog"
        indexes = [
        models.Index(fields=['-create_at']),  # Since you order by this in the ViewSet
    ]


class BlogImage(models.Model):
    blog = models.ForeignKey(
        Blog, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='blog_images/')

    def __str__(self):
        return f"Image for {self.blog.title}"

    def admin_image(self):
        if self.image:
            return mark_safe('<img src="%s" width="150" height="150" />' % self.image.url)
        return 'No Image'

    admin_image.short_description = 'Image'
    admin_image.allow_tags = True
