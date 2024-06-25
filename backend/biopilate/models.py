from django.db import models

class MyModel(models.Model):
    field_name = models.CharField(max_length=100)
