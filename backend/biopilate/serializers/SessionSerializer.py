from rest_framework import serializers
from ..models.sessionsplannig import CoursePlanning, SessionPlanning

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePlanning
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'image': {'required': False},
            'decription_link': {'required': False},
            'description' : {'required': False},
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
    def get_schedule(self, obj):
        if not obj.schedule:
            return None
            
        # Convert the schedule to a formatted string
        schedule_lines = []
        schedule_data = obj.schedule
        
        # Handle the case where schedule is stored as a dictionary
        if isinstance(schedule_data, dict):
            for date, time in schedule_data.items():
                if date not in ['start_date', 'end_date']:
                    schedule_lines.append(f"- {date}: {time}")
        
        # Return the formatted schedule
        return "\n".join(schedule_lines) if schedule_lines else None