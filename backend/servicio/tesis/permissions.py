from rest_framework import permissions


class IsAdminRole(permissions.BasePermission):
    """
    Permiso personalizado: solo usuarios con rol 'admin'
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsDocenteOrAdmin(permissions.BasePermission):
    """
    Permiso personalizado: usuarios con rol 'docente' o 'admin'
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['admin', 'docente']
        )


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permiso personalizado: el owner del objeto o admin
    """
    def has_object_permission(self, request, view, obj):
        # Admin puede todo
        if request.user.role == 'admin':
            return True
        # Owner solo puede ver/editar lo suyo
        if hasattr(obj, 'usuario'):
            return obj.usuario == request.user
        if hasattr(obj, 'creado_por'):
            return obj.creado_por == request.user
        return False


class ReadOnlyOrDocenteAdmin(permissions.BasePermission):
    """
    Permiso personalizado: 
    - Lectura para todos los autenticados
    - Escritura solo para docente o admin
    """
    def has_permission(self, request, view):
        # Todos pueden leer
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        # Solo docente o admin pueden escribir
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['admin', 'docente']
        )
