from rest_framework import serializers
from .models import Drill, DrillModifier, Workout, Section


class ModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillModifier
        fields =['id', 'modifier', 'unit']


class DrillSerializer(serializers.ModelSerializer):
    modifiers = ModifierSerializer(many=True, required=False)

    def create(self, validated_data):
        modifiers_data = validated_data.pop('modifiers')
        drill = Drill.objects.create(**validated_data)
        for modifier_data in modifiers_data:
            modifier_data["drill_id"] = drill.pk
        self.get_fields()["modifiers"].create(modifiers_data)
        return drill

    class Meta:
        model = Drill
        fields = ['id', 'drill_name', 'created_at', 'order', 'modifiers']


class SectionSerializer(serializers.ModelSerializer):
    drills = DrillSerializer(many=True, required=False)

    def create(self, validated_data):
        drills_data = validated_data.pop('drills')
        section = Section.objects.create(**validated_data)
        for drill_data in drills_data:
            drill_data["section_id"] = section.pk
        self.get_fields()["drills"].create(drills_data)
        return section

    class Meta:
        model = Section
        fields = ['id', 'name', 'order', 'drills']


class WorkoutSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, required=False)

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        workout = Workout.objects.create(**validated_data)
        for section_data in sections_data:
            section_data["workout_id"] = workout.pk
        self.get_fields()["sections"].create(sections_data)
        return workout

    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'sections']