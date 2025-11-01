from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from tesis.models import Tesis, Favorito
from tesis.permissions import IsAdminRole, IsDocenteOrAdmin, ReadOnlyOrDocenteAdmin
from .serializer import (
    TesisSerializer, 
    UsuarioSerializer, 
    CustomTokenObtainPairSerializer,
    FavoritoSerializer,
    FavoritoCreateSerializer
)

User = get_user_model()


# Vista personalizada de Token JWT con rol
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# ViewSet de Tesis con permisos por rol
class TesisViewSet(viewsets.ModelViewSet):
    queryset = Tesis.objects.all()
    serializer_class = TesisSerializer
    permission_classes = [IsAuthenticated, ReadOnlyOrDocenteAdmin]
    
    def get_queryset(self):
        """
        Filtrar tesis según el rol del usuario
        - Admin: ve todas
        - Docente: ve todas (puede crear/editar)
        - Estudiante: ve todas (solo lectura)
        """
        user = self.request.user
        
        # Filtro opcional por query params
        queryset = Tesis.objects.all()
        
        # Filtrar por autor si se pasa como parámetro
        autor = self.request.query_params.get('autor', None)
        if autor:
            queryset = queryset.filter(autor__icontains=autor)
        
        # Filtrar por año
        anio = self.request.query_params.get('anio', None)
        if anio:
            queryset = queryset.filter(fecha_publicacion=anio)
        
        # Filtrar por título
        titulo = self.request.query_params.get('titulo', None)
        if titulo:
            queryset = queryset.filter(titulo__icontains=titulo)
        
        return queryset
    
    def perform_create(self, serializer):
        """Asignar el usuario que crea la tesis"""
        serializer.save(creado_por=self.request.user)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def mis_tesis(self, request):
        """Endpoint para obtener las tesis creadas por el usuario actual"""
        tesis = self.queryset.filter(creado_por=request.user)
        serializer = self.get_serializer(tesis, many=True)
        return Response(serializer.data)


# ViewSet de Favoritos
class FavoritoViewSet(viewsets.ModelViewSet):
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Cada usuario solo ve sus propios favoritos"""
        return Favorito.objects.filter(usuario=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return FavoritoCreateSerializer
        return FavoritoSerializer
    
    def perform_create(self, serializer):
        """Asignar el usuario actual al favorito"""
        serializer.save(usuario=self.request.user)
    
    @action(detail=False, methods=['post'])
    def toggle(self, request):
        """
        Agregar o quitar de favoritos
        Body: { "tesis": 1 }
        """
        tesis_id = request.data.get('tesis')
        
        if not tesis_id:
            return Response(
                {'error': 'Se requiere el ID de la tesis'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            tesis = Tesis.objects.get(id=tesis_id)
        except Tesis.DoesNotExist:
            return Response(
                {'error': 'Tesis no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        favorito, created = Favorito.objects.get_or_create(
            usuario=request.user,
            tesis=tesis
        )
        
        if not created:
            # Si ya existía, lo eliminamos
            favorito.delete()
            return Response(
                {'message': 'Eliminado de favoritos', 'favorito': False},
                status=status.HTTP_200_OK
            )
        
        return Response(
            {
                'message': 'Agregado a favoritos',
                'favorito': True,
                'data': FavoritoSerializer(favorito).data
            },
            status=status.HTTP_201_CREATED
        )


# ViewSet de Usuarios (solo para admin)
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdminRole]
    
    @action(detail=True, methods=['patch'])
    def cambiar_rol(self, request, pk=None):
        """Endpoint para cambiar el rol de un usuario"""
        usuario = self.get_object()
        nuevo_rol = request.data.get('role')
        
        if nuevo_rol not in ['admin', 'docente', 'estudiante']:
            return Response(
                {'error': 'Rol inválido. Debe ser: admin, docente o estudiante'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        usuario.role = nuevo_rol
        usuario.save()
        
        return Response(
            {
                'message': f'Rol actualizado a {usuario.get_role_display()}',
                'usuario': UsuarioSerializer(usuario).data
            }
        )


# Vista de Registro (público)
class UsuarioCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]


# Vista de Perfil (usuario autenticado)
class PerfilView(generics.RetrieveUpdateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        """Retornar el usuario actual"""
        return self.request.user
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Estadísticas del usuario"""
        user = request.user
        
        stats = {
            'total_favoritos': user.favoritos.count(),
        }
        
        if user.role in ['admin', 'docente']:
            stats['total_tesis_creadas'] = user.tesis_creadas.count()
        
        return Response(stats)