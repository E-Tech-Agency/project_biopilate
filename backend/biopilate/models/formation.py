from django.db import models


class Option(models.Model):
    name = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name

class Formation(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    options = models.ManyToManyField(Option, through='FormationCategory')
    def __str__(self):
        return self.title

    

    class Meta:
       
        verbose_name_plural = "Formations"

class FormationCategory(models.Model):
    formation  = models.ForeignKey(Formation, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)  

    
