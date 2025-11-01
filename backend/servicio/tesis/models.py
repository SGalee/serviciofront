from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Modelo de Usuario personalizado con roles
class User(AbstractUser):
    """
    Modelo de Usuario personalizado con sistema de roles
    """
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('docente', 'Docente'),
        ('estudiante', 'Estudiante'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='estudiante',
        verbose_name='Rol'
    )
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def is_admin(self):
        return self.role == 'admin'
    
    @property
    def is_docente(self):
        return self.role == 'docente'
    
    @property
    def is_estudiante(self):
        return self.role == 'estudiante'


# Modelo de Tesis
class Tesis(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=100)
    fecha_publicacion = models.IntegerField()
    resumen = models.TextField()
    archivo_pdf = models.FileField(upload_to='tesis_pdfs/')
    tutor = models.CharField(max_length=100)
    creado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='tesis_creadas'
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Tesis'
        verbose_name_plural = 'Tesis'
        ordering = ['-fecha_creacion']

    def __str__(self):
        return self.titulo


# Modelo de Favoritos
class Favorito(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='favoritos'
    )
    tesis = models.ForeignKey(
        Tesis,
        on_delete=models.CASCADE,
        related_name='favoritos'
    )
    fecha_agregado = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['usuario', 'tesis']
        verbose_name = 'Favorito'
        verbose_name_plural = 'Favoritos'
        ordering = ['-fecha_agregado']
    
    def __str__(self):
        return f"{self.usuario.username} - {self.tesis.titulo}"