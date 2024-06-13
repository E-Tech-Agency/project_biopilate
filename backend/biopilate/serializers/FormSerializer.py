from rest_framework import serializers
from ..models.formation import Formation, Option, FormationCategory

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'

class SelectedOptionSerializer(serializers.ModelSerializer):
    option = OptionSerializer()

    class Meta:
        model = FormationCategory
        fields = '__all__'

    def create(self, validated_data):
        option_data = validated_data.pop('option')
        option, created = Option.objects.get_or_create(name=option_data['name'])
        selected_option = FormationCategory.objects.create(option=option, **validated_data)
        return selected_option

class FormationsSerializer(serializers.ModelSerializer):
    options = SelectedOptionSerializer(source='formationcategory_set',many=True)

    class Meta:
        model = Formation
        fields = ['id', 'title', 'description', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop('formationcategory_set')
        formation = Formation.objects.create(**validated_data)
        for option_data in options_data:
            option_details = option_data.pop('option')
            option, created = Option.objects.get_or_create(name=option_details['name'])
            FormationCategory.objects.create(formation=formation, option=option, price=option_data['price'])
        return formation

    def update(self, instance, validated_data):
        options_data = validated_data.pop('formationcategory_set')
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        # Clear existing options
        FormationCategory.objects.filter(formation=instance).delete()

        # Add new options
        for option_data in options_data:
            option_details = option_data.pop('option')
            option, created = Option.objects.get_or_create(name=option_details['name'])
            FormationCategory.objects.create(formation=instance, option=option, price=option_data['price'])
        return instance
