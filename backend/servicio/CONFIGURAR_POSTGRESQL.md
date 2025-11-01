# 🐘 CONFIGURACIÓN DE POSTGRESQL

## 📋 PASO 1: INSTALAR POSTGRESQL

### Windows:
1. Descargar PostgreSQL desde: https://www.postgresql.org/download/windows/
2. Ejecutar el instalador
3. Durante la instalación, recordar:
   - **Puerto:** 5432 (default)
   - **Contraseña del superusuario (postgres):** LA QUE ELIJAS
   - **Locale:** Spanish_Spain o tu preferencia

### Verificar instalación:
```powershell
psql --version
```

---

## 📋 PASO 2: CONFIGURAR EL ARCHIVO .env

Edita el archivo `.env` y actualiza estos valores:

```env
DB_NAME=servicio_tesis_db
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_DE_POSTGRES  ← CAMBIAR ESTO
DB_HOST=localhost
DB_PORT=5432
```

---

## 📋 PASO 3: CREAR LA BASE DE DATOS

### Opción A: Usar pgAdmin (GUI)

1. Abrir **pgAdmin 4**
2. Conectarse al servidor local (localhost)
3. Click derecho en "Databases" → "Create" → "Database"
4. Nombre: `servicio_tesis_db`
5. Owner: `postgres`
6. Click "Save"

### Opción B: Usar psql (Terminal)

```powershell
# 1. Conectarse a PostgreSQL
psql -U postgres

# 2. Crear la base de datos
CREATE DATABASE servicio_tesis_db;

# 3. Listar bases de datos para verificar
\l

# 4. Conectarse a la base de datos
\c servicio_tesis_db

# 5. Salir
\q
```

### Opción C: Usar el script SQL incluido

```powershell
# Ejecutar el script
psql -U postgres -f setup_database.sql

# O si pide contraseña:
psql -U postgres -W -f setup_database.sql
```

---

## 📋 PASO 4: VERIFICAR LA CONEXIÓN DE DJANGO

```powershell
# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Probar conexión
python manage.py dbshell
```

Si te conecta correctamente, verás algo como:
```
psql (15.x)
Type "help" for help.

servicio_tesis_db=#
```

Para salir: `\q`

---

## 📋 PASO 5: APLICAR MIGRACIONES

```powershell
# Eliminar migraciones anteriores (si existen)
Remove-Item tesis\migrations\0*.py -Force -ErrorAction SilentlyContinue

# Crear nuevas migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser
```

---

## 🔍 VERIFICAR QUE TODO FUNCIONA

```powershell
# 1. Conectarse a la base de datos
psql -U postgres -d servicio_tesis_db

# 2. Listar tablas
\dt

# Deberías ver tablas como:
# - auth_user
# - tesis_user
# - tesis_tesis
# - tesis_favorito
# etc.

# 3. Ver usuarios
SELECT username, email, role FROM tesis_user;

# 4. Salir
\q
```

---

## 🛠️ COMANDOS ÚTILES DE POSTGRESQL

### Conexión:
```powershell
# Conectarse como postgres
psql -U postgres

# Conectarse a una base de datos específica
psql -U postgres -d servicio_tesis_db

# Conectarse con contraseña
psql -U postgres -W
```

### Comandos dentro de psql (\):
```sql
\l              -- Listar bases de datos
\c dbname       -- Conectarse a una base de datos
\dt             -- Listar tablas
\d+ tablename   -- Describir una tabla
\du             -- Listar usuarios
\q              -- Salir
```

### Consultas útiles:
```sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver usuarios de la app
SELECT * FROM tesis_user;

-- Ver tesis
SELECT id, titulo, autor, fecha_publicacion FROM tesis_tesis;

-- Contar registros
SELECT COUNT(*) FROM tesis_tesis;

-- Eliminar todos los registros (¡cuidado!)
TRUNCATE tesis_tesis CASCADE;
```

---

## 🔄 MIGRAR DATOS DE SQLITE A POSTGRESQL (SI YA TIENES DATOS)

Si ya tenías datos en SQLite y quieres migrarlos:

```powershell
# 1. Hacer backup de datos desde SQLite
python manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 4 > backup_data.json

# 2. Cambiar a PostgreSQL en settings.py

# 3. Aplicar migraciones en PostgreSQL
python manage.py migrate

# 4. Cargar datos
python manage.py loaddata backup_data.json
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "psql: FATAL: password authentication failed"
```powershell
# Verificar que la contraseña en .env es correcta
cat .env

# O reiniciar contraseña de postgres:
psql -U postgres
ALTER USER postgres WITH PASSWORD 'nueva_contraseña';
```

### Error: "could not connect to server"
```powershell
# Verificar que PostgreSQL está corriendo
Get-Service postgresql*

# Iniciar servicio si está detenido
Start-Service postgresql-x64-15  # (ajustar versión)
```

### Error: "django.db.utils.OperationalError: FATAL: database does not exist"
```powershell
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE servicio_tesis_db;"
```

### Error: "No module named 'psycopg2'"
```powershell
pip install psycopg2-binary
```

### Error: "permission denied for database"
```powershell
# Dar permisos al usuario
psql -U postgres
GRANT ALL PRIVILEGES ON DATABASE servicio_tesis_db TO postgres;
```

---

## 🎯 VENTAJAS DE POSTGRESQL VS SQLITE

✅ **Mejor rendimiento** con múltiples usuarios  
✅ **Transacciones más robustas**  
✅ **Búsquedas de texto completo** (full-text search)  
✅ **Tipos de datos avanzados** (JSON, Array, etc.)  
✅ **Escalabilidad** para producción  
✅ **Backups más fáciles**  
✅ **Concurrencia real**  

---

## 📊 MONITOREO Y MANTENIMIENTO

### Ver conexiones activas:
```sql
SELECT * FROM pg_stat_activity WHERE datname = 'servicio_tesis_db';
```

### Ver tamaño de la base de datos:
```sql
SELECT pg_size_pretty(pg_database_size('servicio_tesis_db'));
```

### Hacer backup:
```powershell
pg_dump -U postgres servicio_tesis_db > backup.sql
```

### Restaurar backup:
```powershell
psql -U postgres servicio_tesis_db < backup.sql
```

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] PostgreSQL instalado
- [ ] Servicio PostgreSQL corriendo
- [ ] Base de datos `servicio_tesis_db` creada
- [ ] Archivo `.env` actualizado con credenciales correctas
- [ ] `python-dotenv` instalado (`pip install python-dotenv`)
- [ ] `psycopg2-binary` instalado (ya está en requirements.txt)
- [ ] Conexión probada con `python manage.py dbshell`
- [ ] Migraciones aplicadas
- [ ] Superusuario creado

---

## 🚀 INICIAR EL SERVIDOR

Una vez todo configurado:

```powershell
python manage.py runserver
```

---

## 📝 CONFIGURACIÓN RECOMENDADA PARA PRODUCCIÓN

En producción, considera:

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
        'CONN_MAX_AGE': 600,  # Conexiones persistentes
        'OPTIONS': {
            'connect_timeout': 10,
        }
    }
}
```

---

¡Tu backend ahora está configurado con PostgreSQL! 🎉
