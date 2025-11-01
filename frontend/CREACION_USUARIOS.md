# 🔐 Guía de Creación de Usuarios por Rol

## 📋 Resumen

El sistema tiene 3 tipos de usuarios con diferentes permisos:
- **Estudiante**: Acceso básico (consulta de tesis, favoritos)
- **Docente**: Puede crear y gestionar tesis
- **Admin**: Acceso completo (gestionar usuarios, tesis, etc.)

---

## 🎯 Métodos para Crear Usuarios

### **Opción 1: Registro Público** (Solo Estudiantes) ✅ IMPLEMENTADO

**URL**: `/registro`  
**Acceso**: Público (sin autenticación)  
**Rol creado**: Siempre `estudiante`

**Características**:
- Formulario público en la página de registro
- Solo crea usuarios con rol "estudiante"
- Validación de correo institucional (@usm.edu.ve)
- Usuario elige su propio username y contraseña

**Endpoint**: `POST /api/registro/`

```json
{
  "username": "usuario123",
  "password": "contraseña",
  "email": "correo@usm.edu.ve",
  "first_name": "Nombre",
  "last_name": "Apellido"
}
```

---

### **Opción 2: Panel de Administración** (Todos los roles) ✅ IMPLEMENTADO

**URL**: `/admin/crear-usuario`  
**Acceso**: Solo administradores autenticados  
**Rol creado**: Cualquiera (estudiante, docente, admin)

**Características**:
- Interfaz administrativa completa
- El admin elige el rol del nuevo usuario
- Validaciones y mensajes de éxito/error
- Integrado con el endpoint del backend

**Endpoint**: `POST /api/usuarios/`

```json
{
  "username": "docente123",
  "password": "contraseña",
  "email": "docente@usm.edu.ve",
  "first_name": "Nombre",
  "last_name": "Apellido",
  "role": "docente"  // estudiante | docente | admin
}
```

**⚠️ Requiere token de administrador en el header**:
```
Authorization: Bearer <access_token>
```

---

### **Opción 3: Django Admin Panel** (Backend)

**URL**: `http://localhost:8000/admin/`  
**Acceso**: Superusuario de Django  
**Rol creado**: Cualquiera

**Cómo acceder**:
1. Crear superusuario desde terminal:
   ```bash
   python manage.py createsuperuser
   ```

2. Acceder a `http://localhost:8000/admin/`

3. Ir a "Users" y crear nuevo usuario

4. Asignar el campo `role` manualmente

---

### **Opción 4: Script de Python** (Backend)

Crear un script `create_admin.py` en tu proyecto Django:

```python
from django.contrib.auth import get_user_model

User = get_user_model()

# Crear administrador
admin = User.objects.create_user(
    username='admin',
    email='admin@usm.edu.ve',
    password='admin123',
    first_name='Administrador',
    last_name='Sistema',
    role='admin'
)

print(f"✅ Usuario admin creado: {admin.username}")

# Crear docente
docente = User.objects.create_user(
    username='docente1',
    email='docente1@usm.edu.ve',
    password='docente123',
    first_name='Juan',
    last_name='Pérez',
    role='docente'
)

print(f"✅ Usuario docente creado: {docente.username}")
```

Ejecutar:
```bash
python manage.py shell < create_admin.py
```

---

## 🚀 Flujo Recomendado de Implementación

### 1️⃣ **Configuración Inicial** (Primera vez)

```bash
# Backend: Crear primer admin desde terminal
python manage.py createsuperuser
# O usar el script de Python
```

### 2️⃣ **Crear Docentes y más Admins**

- Login como admin en el frontend
- Ir a `/admin/crear-usuario`
- Crear docentes y otros admins desde la interfaz

### 3️⃣ **Estudiantes se registran solos**

- Usar el formulario público `/registro`
- Se crean automáticamente con rol "estudiante"

---

## 📊 Comparación de Métodos

| Método | Roles | Requiere Auth | Interfaz | Uso |
|--------|-------|---------------|----------|-----|
| Registro Público | Solo estudiante | No | Frontend | Usuarios finales |
| Panel Admin (Frontend) | Todos | Sí (admin) | Frontend | Gestión de usuarios |
| Django Admin | Todos | Sí (superuser) | Backend | Setup inicial |
| Script Python | Todos | No | Terminal | Automatización |

---

## ⚙️ Verificación del Backend

Asegúrate que tu backend tenga estos endpoints:

### 1. Registro público
```python
# POST /api/registro/
# Crea usuario con role='estudiante' por defecto
```

### 2. Gestión de usuarios (admin)
```python
# POST /api/usuarios/ - Crear usuario
# GET /api/usuarios/ - Listar usuarios
# GET /api/usuarios/{id}/ - Detalle
# PATCH /api/usuarios/{id}/ - Actualizar
# DELETE /api/usuarios/{id}/ - Eliminar
```

### 3. JWT con campo 'role'
```python
# El token JWT debe incluir el role del usuario
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role  # ⚠️ IMPORTANTE
        return token
```

---

## 🔍 Troubleshooting

### Problema: No puedo crear el primer admin
**Solución**: Usa Django Admin o script de Python para crear el primer admin

### Problema: El rol no se guarda correctamente
**Solución**: Verifica que el modelo User tenga el campo `role` y el endpoint lo acepte

### Problema: "No tienes permisos"
**Solución**: Solo los admins pueden acceder a `/admin/crear-usuario`

---

## 📝 Notas Importantes

1. **Primer Admin**: Debe crearse manualmente desde el backend (Django Admin o script)

2. **Seguridad**: El endpoint `/api/usuarios/` debe validar que solo admins puedan crear usuarios con roles admin/docente

3. **Validación**: El registro público siempre crea estudiantes, no importa lo que envíe el cliente

4. **Correos**: Todos los correos deben ser @usm.edu.ve (validación en frontend y backend)

---

## ✅ Estado Actual de Implementación

- ✅ Registro público (estudiantes)
- ✅ Panel admin para crear cualquier rol
- ✅ Validaciones completas
- ✅ Manejo de errores
- ✅ Integración con API
- ⚠️ Pendiente: Verificar endpoints del backend
