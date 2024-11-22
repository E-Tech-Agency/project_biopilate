from rest_framework import serializers
from ..models.teaches import Cours, CategoryCours


class CategoryCoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryCours
        fields = ['id', 'name']


class CoursSerializer(serializers.ModelSerializer):
    category_cours = serializers.CharField(
        source='category.name', read_only=True)

    class Meta:
        model = Cours
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'category_cours']
        extra_kwargs = {
            'image': {'required': False},
        }
