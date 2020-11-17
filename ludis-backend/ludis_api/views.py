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
from ludis_api.models import Workout, User, Schedule
from ludis_api.serializers import WorkoutSerializer, UserRegistrationSerializer, UserLoginSerializer, \
    ScheduleSerializer, ReportSerializer, UserShortSerializer
from django.shortcuts import render
from ludis_api.permissions import IsWorkoutView
from ludis_api.utils.enums import Role

def index(request):
    return render(request, "build/index.html")


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

        if self.request.user.role == Role.COACH.value:
            queryset = Schedule.objects.annotate(average_effort=Avg('reports__effort'),
                                                 average_duration =Avg('reports__duration'),
                                                 average_satisfaction=Avg('reports__satisfaction'))\
                .filter(owner__organization=self.request.user.organization)
        else:
            queryset = self.request.user.user_schedule.all()
        queryset.annotate(average_effort=Avg('reports__effort'))
        return queryset


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def set_report(self, request, pk=None):
        user = self.request.user
        request.data["schedule"] = pk
        request.data["athlete"] = user.id
        print(user.id)
        serializer = ReportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not Schedule.objects.get(pk=pk).users.filter(id=user.id).exists():
            return Response({'status': "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        status_code = status.HTTP_200_OK
        return Response({'status': 'Report successfully set'}, status=status_code)


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
            'success': 'True',
            'status_code': status.HTTP_200_OK,
            'message': 'User logged in successfully',
            'access_token': serializer.data['access_token'],
            'refresh_token': serializer.data['refresh_token'],
            'role': serializer.data['role']
        }

        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)


class UserListView(ListAPIView):
    serializer_class = UserShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(organization=self.request.user.organization, role=Role.ATHLETE.value)