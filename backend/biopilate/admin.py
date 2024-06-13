from django.contrib import admin
from .models.formation import *
# Register your models here.
admin.site.register(Option)
admin.site.register(Formation)
admin.site.register(FormationCategory)