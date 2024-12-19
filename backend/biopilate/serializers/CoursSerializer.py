from rest_framework import serializers
from ..models.cours import Cours, CategoryCours
from .TagesSerializer import TagesSerializer


class CategoryCoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryCours
        fields = ['id', 'name']


class CoursSerializer(serializers.ModelSerializer):
    category_cours = serializers.CharField(
        source='category.name', read_only=True)
    tages = TagesSerializer(many=True, read_only=True)

    class Meta:
        model = Cours
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'category_cours', 'tages']
        extra_kwargs = {
            'image': {'required': False},
        }
