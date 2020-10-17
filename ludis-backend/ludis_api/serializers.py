from rest_framework import serializers
from .models import Drill, DrillModifiers, Workout, Section


class ModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillModifiers
        fields =['id', 'modifier', 'unit']


class DrillSerializer(serializers.ModelSerializer):
    modifiers = ModifierSerializer(many=True, required=False)

    class Meta:
        model = Drill
        fields = ['id', 'drill_name', 'created_at', 'order', 'modifiers']


class SectionSerializer(serializers.ModelSerializer):
    drills = DrillSerializer(many=True, required=False)

    class Meta:
        model = Section
        fields = ['id', 'name', 'order', 'drills']


class WorkoutSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, required=False)

    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'sections']