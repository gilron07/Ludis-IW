from django.db.models import Avg
from django.shortcuts import render
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from django.db import transaction
from ludis_api.models import Workout, User, Schedule, Challenge, ChallengeResponse
from ludis_api.serializers import WorkoutSerializer, UserRegistrationSerializer, UserLoginSerializer, \
    ScheduleSerializer, ReportSerializer, UserShortSerializer, ChallengeSerializer, ChallengeResponseSerializer
from django.shortcuts import render
from ludis_api.permissions import IsWorkoutView
from ludis_api.utils.enums import Role

def index(request):
    return render(request, "index.html")


class WorkoutViewSet(ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated, IsWorkoutView]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Workout.objects.filter(owner__organization=self.request.user.organization)


class ScheduleViewSet(ModelViewSet):
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = None
        if self.request.user.role == Role.COACH.name:
            queryset = Schedule.objects.annotate(average_effort=Avg('reports__effort'),
                                                 average_duration =Avg('reports__duration'),
                                                 average_satisfaction=Avg('reports__satisfaction'))\
                .filter(owner__organization=self.request.user.organization)
        else:
            queryset = self.request.user.user_schedule.all()
        return queryset.order_by('date')


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'status': 'Scheduling successfully created'}, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post'])
    def set_report(self, request, pk=None):
        user = self.request.user
        request.data["schedule"] = pk
        request.data["athlete"] = user.id
        serializer = ReportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not Schedule.objects.get(pk=pk).users.filter(id=user.id).exists():
            return Response({'status': "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        status_code = status.HTTP_200_OK
        return Response({'message': 'Report successfully set'}, status=status_code)


class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            'success': 'True',
            'status code': status_code,
            'message': 'User registered  successfully',
            'user': serializer.data
            }
        return Response(response, status=status_code)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            'access_token': serializer.data['access_token'],
            'refresh_token': serializer.data['refresh_token'],
            'role': serializer.data['role'],
            'full_name': serializer.data['full_name']
        }

        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)


class UserTokenVerify(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        response = {
            'role': request.user.role,
            'full_name': request.user.full_name
        }

        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)


class UserListView(ListAPIView):
    serializer_class = UserShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(organization=self.request.user.organization, role=Role.ATHLETE.name).order_by('full_name')


class ChallengeViewSet(ModelViewSet):
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Challenge.objects.filter(owner__organization=self.request.user.organization)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @transaction.atomic
    @action(detail=True, methods=['post'])
    def set_response(self, request, pk=None):
        user = self.request.user
        request.data["challenge"] = pk
        request.data["user"] = user.id
        # Would delete if response already exists
        ChallengeResponse.objects.filter(challenge=pk, user=user.id).delete()
        serializer = ChallengeResponseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if Challenge.objects.get(pk=pk).owner.organization != self.request.user.organization:
            return Response({'status': "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        status_code = status.HTTP_200_OK
        return Response(serializer.data, status=status_code)