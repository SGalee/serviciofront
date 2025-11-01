# 🔌 Guía de Integración con el Backend

## 📍 Configuración Base

Basado en los endpoints del backend Django Rest Framework.

### URL Base
```javascript
const BASE_URL = 'http://localhost:8000';
const API_URL = 'http://localhost:8000/api';
```

---

## 🎯 Pasos para Conectar el Frontend con tu Backend

### 1. **Asegúrate de que el Backend esté corriendo**

```bash
# En el directorio del backend
python manage.py runserver
```

### 2. **Verificar CORS**

El backend ya está configurado para aceptar peticiones de:
- `http://localhost:5173` (Vite - Frontend React)
- `http://localhost:3000` (React/Next.js alternativo)

### 3. **Formato del Token JWT**

El backend retorna los tokens en este formato:

```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

El token debe enviarse en el header:
```
Authorization: Bearer <access_token>
```

---

## 🔧 Actualización Necesaria en el Backend

### IMPORTANTE: Agregar el rol al Token JWT

Para que el sistema de roles funcione, necesitas que el backend incluya el rol del usuario en el payload del JWT.

#### Opción 1: Usando `rest_framework_simplejwt` (Recomendado)

**Archivo: `backend/settings.py`**

```python
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
```

**Crear serializer personalizado:**

**Archivo: `backend/serializers.py`**

```python
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregar campos personalizados al token
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role  # Asumiendo que tienes un campo 'role' en tu modelo User
        # Si no tienes el campo 'role', puedes usar groups:
        # token['role'] = user.groups.first().name if user.groups.exists() else 'estudiante'

        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
```

**Actualizar urls.py:**

**Archivo: `backend/urls.py`**

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .serializers import CustomTokenObtainPairView

urlpatterns = [
    # ... otras rutas
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

#### Opción 2: Agregar campo 'role' al modelo User

**Archivo: `backend/models.py`**

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('docente', 'Docente'),
        ('estudiante', 'Estudiante'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='estudiante'
    )
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
```

**No olvides hacer las migraciones:**

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 📡 Endpoints Requeridos en el Backend

### 1. **Autenticación** ✅ (Ya están)

```python
# urls.py
urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/registro/', RegistroView.as_view(), name='registro'),
]
```

### 2. **Perfil de Usuario** (Nuevo - Agregar)

```python
# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class PerfilView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

# urls.py
urlpatterns = [
    # ...
    path('api/perfil/', PerfilView.as_view(), name='perfil'),
]
```

### 3. **Gestión de Usuarios (Admin)** (Nuevo - Agregar)

```python
# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

# urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'usuarios', UserViewSet, basename='usuario')

urlpatterns = [
    # ...
    path('api/', include(router.urls)),
]
```

### 4. **Tesis** ✅ (Ya están)

Ya tienes los endpoints de tesis configurados.

### 5. **Favoritos** (Nuevo - Agregar)

```python
# models.py
class Favorito(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favoritos')
    tesis = models.ForeignKey(Tesis, on_delete=models.CASCADE)
    fecha_agregado = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['usuario', 'tesis']

# serializers.py
class FavoritoSerializer(serializers.ModelSerializer):
    tesis_detalle = TesisSerializer(source='tesis', read_only=True)
    
    class Meta:
        model = Favorito
        fields = ['id', 'tesis', 'tesis_detalle', 'fecha_agregado']

# views.py
class FavoritoViewSet(viewsets.ModelViewSet):
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

# urls.py
router.register(r'favoritos', FavoritoViewSet, basename='favorito')
```

---

## 🔐 Permisos Personalizados

Para controlar acceso basado en roles:

```python
# permissions.py
from rest_framework import permissions

class IsAdminRole(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'

class IsDocenteOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role in ['admin', 'docente']

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin puede todo
        if request.user.role == 'admin':
            return True
        # Owner solo puede leer/editar lo suyo
        return obj.usuario == request.user

# Uso en views
class TesisViewSet(viewsets.ModelViewSet):
    queryset = Tesis.objects.all()
    serializer_class = TesisSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsDocenteOrAdmin()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        # Admin ve todas
        if user.role == 'admin':
            return Tesis.objects.all()
        # Docente ve las suyas
        elif user.role == 'docente':
            return Tesis.objects.filter(usuario=user)
        # Estudiante ve todas (solo lectura)
        else:
            return Tesis.objects.all()
```

---

## 🧪 Probar la Conexión

### 1. **Test de Login**

```javascript
// En tu frontend
const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'tu_usuario',
        password: 'tu_contraseña'
      })
    });
    
    const data = await response.json();
    console.log('Token recibido:', data);
    
    // Decodificar el token para ver el payload
    const payload = JSON.parse(atob(data.access.split('.')[1]));
    console.log('Payload del token:', payload);
  } catch (error) {
    console.error('Error:', error);
  }
};

testLogin();
```

### 2. **Test de Endpoint Protegido**

```javascript
const testProtectedEndpoint = async () => {
  const token = localStorage.getItem('access_token');
  
  try {
    const response = await fetch('http://localhost:8000/api/tesis/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Tesis:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🎬 Iniciar el Frontend

```bash
# En el directorio del frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 📋 Checklist de Integración

- [ ] Backend corriendo en `http://localhost:8000`
- [ ] Frontend corriendo en `http://localhost:5173`
- [ ] CORS configurado correctamente
- [ ] Token JWT incluye el campo `role`
- [ ] Endpoint `/api/perfil/` implementado
- [ ] Endpoint `/api/usuarios/` implementado (admin)
- [ ] Endpoint `/api/favoritos/` implementado
- [ ] Permisos por rol configurados
- [ ] Modelo User con campo `role`
- [ ] Migraciones aplicadas

---

## 🚨 Errores Comunes y Soluciones

### Error: CORS policy blocked

**Solución:**
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

### Error: Token doesn't contain 'role'

**Solución:** Implementa el `CustomTokenObtainPairSerializer` como se muestra arriba.

### Error: 401 Unauthorized en endpoints protegidos

**Solución:** 
- Verifica que el token esté en localStorage
- Verifica que el header `Authorization` tenga el formato correcto: `Bearer <token>`
- Verifica que el token no haya expirado

### Error: User has no attribute 'role'

**Solución:** Agrega el campo `role` al modelo User y haz las migraciones.

---

## 📞 Próximos Pasos

1. **Implementar los endpoints faltantes en el backend**
2. **Probar el login desde el frontend**
3. **Verificar que el token incluya el rol**
4. **Probar la navegación según roles**
5. **Implementar las funcionalidades de cada página**

---

✅ **¡Listo para integrar!**
