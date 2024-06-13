from rest_framework import serializers
from ..models.services import Services

class ServicesSerializer(serializers.ModelSerializer):
    admin_image = serializers.SerializerMethodField()
    instructeur_fullname = serializers.CharField(source='instructeur.fullname', read_only=True)

    class Meta:
        model = Services
        fields = ['id', 'title', 'image', 'description', 'full_text', 'create_at', 'updated_at', 'status', 'instructeur', 'admin_image', 'instructeur_fullname']
        read_only_fields = ['create_at', 'updated_at', 'admin_image', 'instructeur_fullname']

    def get_admin_image(self, obj):
        return obj.admin_image() if obj.image else 'No Image'
