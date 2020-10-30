from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from .utils.enums import Modifier, Role
from django.contrib.auth import get_user_model

DEFAULT_ORGANIZATION = 1

class Organization(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    created_at = models.DateField(auto_now_add=True)
    org_image = models.CharField(max_length=1000, null=True, blank=True)


class UserManager(BaseUserManager):
    use_in_migration = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        if not password:
            raise ValueError('Password not provided')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_staff', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must have is_staff=True.'
            )

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=255, blank=False)
    full_name = models.CharField(max_length=200, blank=False, null=False)

    # from AbstractUser fields
    is_staff = models.BooleanField(default=False) # access to admin site
    is_active = models.BooleanField(default=True)  # unselect this to delete a use
    date_joined = models.DateTimeField(auto_now_add=True)

    # additional fields to user
    DOB = models.DateField(blank=False, null=False)
    role = models.CharField(max_length=255, choices=Role.choices(), default=Role.ATHLETE.value)
    # gender = models.CharField(max_length=255)
    profile_image = models.CharField(max_length=1000, blank=True, null=True)
    organization = models.ForeignKey(
        Organization, related_name='organization',
        default=DEFAULT_ORGANIZATION,
        on_delete=models.PROTECT
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['DOB', 'full_name']
    objects = UserManager()

    def __str__(self):
        return self.email + " " + self.full_name


class Workout(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField(null=True)
    owner = models.ForeignKey(get_user_model(), related_name='created_workouts', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Section(models.Model):
    name = models.CharField(max_length=64)
    workout = models.ForeignKey(Workout, related_name='sections', on_delete=models.CASCADE)
    order = models.IntegerField(default=1)

    class Meta:
        ordering = ['order']


class Drill(models.Model):
    drill_name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=1)
    section = models.ForeignKey(Section, related_name='drills', on_delete=models.CASCADE)

    class Meta:
        ordering = ['order']


class DrillModifier(models.Model):
    drill = models.ForeignKey(Drill, related_name='modifiers', on_delete=models.CASCADE)
    modifier = models.CharField(max_length=30, choices=Modifier.choices())
    unit = models.CharField(max_length=24, default=None, null=True) # consider switching to enum


    class Meta:
        unique_together = ('drill', 'modifier')


