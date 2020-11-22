from rest_framework import permissions
from ludis_api.utils.enums import Role


class IsWorkoutView(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == Role.COACH.value

    def has_object_permission(self, request, view, obj):
        if request.user.role == Role.COACH.value and \
                request.user.organization == obj.owner.organization and \
                request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user