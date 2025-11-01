from rest_framework import serializers
from tesis.models import Tesis, User, Favorito
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Serializer JWT personalizado con rol
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregar campos personalizados al token
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Agregar información adicional del usuario en la respuesta
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'role': self.user.role,
        }
        
        return data


# Serializer de Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'role', 'password', 'confirm_password', 'date_joined'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'required': False},
            'date_joined': {'read_only': True}
        }

    def validate(self, data):
        # Validar contraseñas coincidan si se envía confirm_password
        if 'confirm_password' in data:
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError({
                    "password": "Las contraseñas no coinciden."
                })
        return data

    def create(self, validated_data):
        # Remover confirm_password antes de crear
        validated_data.pop('confirm_password', None)
        
        # Si no se especifica rol, usar 'estudiante' por defecto
        if 'role' not in validated_data:
            validated_data['role'] = 'estudiante'
        
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        # Remover campos que no se deben actualizar directamente
        validated_data.pop('confirm_password', None)
        password = validated_data.pop('password', None)
        
        # Actualizar campos normales
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Si hay nueva contraseña, actualizarla de forma segura
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance


# Serializer simple de usuario (para respuestas anidadas)
class UsuarioSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']


# Serializer de Tesis
class TesisSerializer(serializers.ModelSerializer):
    creado_por = UsuarioSimpleSerializer(read_only=True)
    creado_por_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = Tesis
        fields = [
            'id', 'titulo', 'autor', 'fecha_publicacion', 'resumen', 
            'archivo_pdf', 'tutor', 'creado_por', 'creado_por_id',
            'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']
    
    def create(self, validated_data):
        # Asignar el usuario que crea la tesis
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['creado_por'] = request.user
        return super().create(validated_data)


# Serializer de Favoritos
class FavoritoSerializer(serializers.ModelSerializer):
    tesis_detalle = TesisSerializer(source='tesis', read_only=True)
    usuario_detalle = UsuarioSimpleSerializer(source='usuario', read_only=True)
    
    class Meta:
        model = Favorito
        fields = ['id', 'usuario', 'tesis', 'tesis_detalle', 'usuario_detalle', 'fecha_agregado']
        read_only_fields = ['usuario', 'fecha_agregado']
    
    def create(self, validated_data):
        # El usuario se asigna desde la vista
        return super().create(validated_data)


# Serializer para crear favorito (más simple)
class FavoritoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = ['tesis']
    
    def validate_tesis(self, value):
        # Verificar que la tesis existe
        if not Tesis.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("La tesis no existe.")
        return value