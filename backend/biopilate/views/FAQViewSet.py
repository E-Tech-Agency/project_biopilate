from rest_framework import viewsets
from ..models.FAQ import FAQ
from ..serializers.FAQSerializer import FAQSerializer

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
