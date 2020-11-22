from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from .models import Drill, DrillModifier, Workout, Section, Organization, Tag, Schedule, UserSchedule, Report
from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from django.db.models import Avg

from .utils.enums import Role


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
    organization_code = serializers.CharField(max_length=255, write_only=True)
    organization = serializers.ReadOnlyField(source='organization.name')
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password', 'full_name', 'DOB', 'role', 'profile_image', 'organization_code', 'organization']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        organization_code = validated_data.pop('organization_code')
        try:
            organization = Organization.objects.get(code=organization_code)
        except Organization.DoesNotExist:
            raise serializers.ValidationError("Invalid organization code")
        user = get_user_model().objects.create_user(**validated_data, organization=organization)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    role = serializers.CharField(max_length=20, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)

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
            'role': user.role,
            'full_name': user.full_name
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


class ReportSerializer(serializers.ModelSerializer):
    schedule = serializers.PrimaryKeyRelatedField(queryset=Schedule.objects.all(), write_only=True)
    athlete = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())
    athlete_name = serializers.ReadOnlyField(source='athlete.full_name')


    class Meta:
        model = Report
        fields = ['id','duration', 'effort', 'satisfaction', 'schedule', 'athlete', 'athlete_name']

class ScheduleSerializer(serializers.ModelSerializer):
    workout = WorkoutShortSerializer(read_only=True)
    owner = serializers.ReadOnlyField(source='owner.full_name')
    # group =  serializers.ReadOnlyField(source='group.name')
    athletes = UserScheduleSerializer(source="userschedule_set", many=True, read_only=True)
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    # reports = ReportSerializer(many=True, read_only=True)
    reports = serializers.SerializerMethodField(read_only=True)

    # Schedule Averages
    average_effort = serializers.DecimalField(decimal_places=2, max_digits=4, read_only=True)
    average_duration = serializers.DecimalField(decimal_places=2, max_digits=4, read_only=True)
    average_satisfaction = serializers.DecimalField(decimal_places=2, max_digits=4, read_only=True)

    # For creating schedule
    dates = serializers.ListField(child=serializers.DateTimeField(), write_only=True)
    workout_id = serializers.PrimaryKeyRelatedField(queryset=Workout.objects.all(), write_only=True)
    athletes_ids = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), many=True, write_only=True)

    class Meta:
        model = Schedule
        fields = [
            'id',
            'date',
            'notes',
            'workout',
            'workout_id',
            'owner',
            'athletes_ids',
            'location',
            'dates',
            'athletes',
            'reports',
            'average_effort',
            'average_duration',
            'average_satisfaction'
        ]

    # def get_average_effort(self, obj):
    #     s = Schedule.objects.annotate(average_effort=Avg('reports__effort')).get(pk=obj.id)
    #     return s.average_effort


    def get_reports(self, obj):
        user = self.context['request'].user
        if user.role == Role.COACH.value:
            serializer = ReportSerializer(obj.reports.all(), many=True)
        else:
            serializer = ReportSerializer(obj.reports.filter(athlete=user), many=True)
        return serializer.data

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


class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'full_name']



