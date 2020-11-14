from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from .models import Drill, DrillModifier, Workout, Section, Organization, Tag, Schedule, UserSchedule
from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction


class ModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillModifier
        fields =['id', 'modifier', 'unit', 'quantity']


class DrillSerializer(serializers.ModelSerializer):
    modifiers = ModifierSerializer(many=True, required=False)

    @transaction.atomic
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

    @transaction.atomic
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class WorkoutSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, required=False)
    tags = TagSerializer(many=True, required=False)
    owner = serializers.ReadOnlyField(source='owner.full_name')

    @transaction.atomic
    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        tags = validated_data.pop('tags')
        workout = Workout.objects.create(**validated_data)

        for tag in tags:
            tag["workout_id"] = workout.pk
        self.get_fields()['tags'].create(tags)

        for section_data in sections_data:
            section_data["workout_id"] = workout.pk
        self.get_fields()["sections"].create(sections_data)
        return workout

    class Meta:
        model = Workout
        fields = ['id', 'title', 'created_at', 'description','tags', 'sections', 'owner']

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
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError('A user with this email and password is not found.')
        try:
            # payload = JWT_PAYLOAD_HANDLER(user)
            # jwt_token = JWT_ENCODE_HANDLER(payload)
            tokens = RefreshToken.for_user(user)
            update_last_login(None, user)
        except get_user_model().DoesNotExist:
            raise serializers.ValidationError('User with given email and password does not exist.')

        return {
            'email': user.email,
            'access_token': str(tokens.access_token),
            'refresh_token': str(tokens),
            'role': user.role
        }


class WorkoutShortSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.full_name')

    class Meta:
        model = Workout
        fields = ['id', 'title', 'owner', 'tags']


class UserScheduleSerializer(serializers.ModelSerializer):
    athlete = serializers.ReadOnlyField(source='user.full_name')
    athlete_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = UserSchedule
        fields = ['athlete', 'athlete_id']


class ScheduleSerializer(serializers.ModelSerializer):
    workout = WorkoutShortSerializer(read_only=True)
    owner = serializers.ReadOnlyField(source='owner.full_name')
    # group =  serializers.ReadOnlyField(source='group.name')
    athletes = UserScheduleSerializer(source="userschedule_set", many=True, read_only=True)
    date = serializers.DateTimeField(source='schedule.date', read_only=True)

    # For creating schedule
    dates = serializers.ListField(child=serializers.DateTimeField(), write_only=True)
    workout_id = serializers.PrimaryKeyRelatedField(queryset=Workout.objects.all(), write_only=True)
    athletes_ids = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), many=True, write_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'date', 'notes', 'workout', 'workout_id', 'owner', 'athletes_ids', 'location','dates','athletes']

    @transaction.atomic
    def create(self, validated_data):
        athletes = validated_data.pop('athletes_ids')
        dates = validated_data.pop('dates')
        workout = validated_data.pop('workout_id')
        if workout.owner.organization != self.context['request'].user.organization:
            raise serializers.ValidationError('Not allowed Workout')
        for date in dates:
            schedule = Schedule.objects.create(**validated_data, date=date, workout=workout)
            for athlete in athletes:
                if athlete.organization != self.context['request'].user.organization:
                    raise serializers.ValidationError('Not allowed User')
                schedule.users.add(athlete)
        return schedule


