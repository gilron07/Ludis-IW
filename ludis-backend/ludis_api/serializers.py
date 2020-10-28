from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from .models import Drill, DrillModifier, Workout, Section, Organization
from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

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
    owner = serializers.ReadOnlyField(source='owner.full_name')

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        workout = Workout.objects.create(**validated_data)
        for section_data in sections_data:
            section_data["workout_id"] = workout.pk
        self.get_fields()["sections"].create(sections_data)
        return workout

    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'sections', 'owner']

        # extra_kwargs = {
        #     'password':{'write_only': True},
        # }


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields =['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'full_name', 'DOB', 'role', 'profile_image', 'organization']


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password', 'full_name', 'DOB', 'role', 'profile_image', 'organization']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    role = serializers.CharField(max_length=20, read_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError('A user with this email and password is not found.')
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except get_user_model().DoesNotExist:
            raise serializers.ValidationError('User with given email and password does not exist.')

        return {
            'email': user.email,
            'role': user.role,
            'token': jwt_token,
            'role': user.role
        }




