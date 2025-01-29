from rest_framework import serializers
from ..models.sessionsplannig import CoursePlanning, SessionPlanning

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePlanning
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'image': {'required': False},
        }

class SessionSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=CoursePlanning.objects.all())

    class Meta:
        model = SessionPlanning
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'course': {'required': True},  # Ensure course is required in the request data
        }

    def validate_course(self, value):
        if not value:
            raise serializers.ValidationError("Le champ 'course' est requis.")
        return value