from rest_framework import viewsets
from ..models.cours import Cours, CategoryCours
from ..serializers.CoursSerializer import CoursSerializer , CategoryCoursSerializer
class CategoryCoursViewSet(viewsets.ModelViewSet):
    queryset = CategoryCours.objects.all()
    serializer_class = CategoryCoursSerializer
class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cours.objects.all().order_by('-created_at')
    serializer_class = CoursSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
