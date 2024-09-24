# backend/urls.py

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseNotFound
def block_root(request):
    return HttpResponseNotFound("This page is not available.")
urlpatterns = [
     path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('secret/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/',include('biopilate.urls')),
    path('api/', include('social_accounts.urls')),
     path('', block_root),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
