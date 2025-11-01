from rest_framework.routers import DefaultRouter
from django.urls import path
from tesis.api.views import (
    TesisViewSet, 
    FavoritoViewSet, 
    UsuarioViewSet,
    PerfilView
)

router = DefaultRouter()
router.register(r'tesis', TesisViewSet, basename='tesis')
router.register(r'favoritos', FavoritoViewSet, basename='favorito')
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('perfil/', PerfilView.as_view(), name='perfil'),
] + router.urls