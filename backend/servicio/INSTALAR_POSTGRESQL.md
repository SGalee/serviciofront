# 🚀 GUÍA RÁPIDA: INSTALAR Y CONFIGURAR POSTGRESQL

## ⚠️ POSTGRESQL NO ESTÁ INSTALADO

Necesitas instalar PostgreSQL antes de continuar.

---

## 📥 PASO 1: DESCARGAR E INSTALAR POSTGRESQL

### Opción A: Instalador oficial (Recomendado)

1. **Descargar:** https://www.postgresql.org/download/windows/
2. **Elegir:** PostgreSQL 15 o superior
3. **Ejecutar** el instalador

### Durante la instalación:

1. **Componentes:** Dejar todo seleccionado (Server, pgAdmin, Command Line Tools)
2. **Directorio:** Dejar por defecto
3. **Contraseña para superusuario (postgres):** 
   - ⚠️ **MUY IMPORTANTE: RECORDAR ESTA CONTRASEÑA**
   - Ejemplo: `postgres123` (usa una más segura en producción)
4. **Puerto:** `5432` (dejar por defecto)
5. **Locale:** Spanish, Spain o default

### Opción B: Chocolatey (si lo tienes instalado)

```powershell
choco install postgresql
```

---

## 📋 PASO 2: VERIFICAR INSTALACIÓN

Después de instalar, **REINICIA** el terminal y ejecuta:

```powershell
psql --version
```

Deberías ver algo como: `psql (PostgreSQL) 15.x`

---

## 📋 PASO 3: CONFIGURAR EL ARCHIVO .env

Edita el archivo `.env` en la carpeta `servicio`:

```env
DB_NAME=servicio_tesis_db
DB_USER=postgres
DB_PASSWORD=LA_CONTRASEÑA_QUE_PUSISTE_EN_LA_INSTALACIÓN
DB_HOST=localhost
DB_PORT=5432
```

---

## 📋 PASO 4: INSTALAR DEPENDENCIAS PYTHON

```powershell
pip install python-dotenv psycopg2-binary
```

---

## 📋 PASO 5: CREAR LA BASE DE DATOS

### Opción A: Usar pgAdmin (GUI - MÁS FÁCIL)

1. Buscar **pgAdmin 4** en el menú de inicio y abrirlo
2. Click en "Servers" → "PostgreSQL 15"
3. Te pedirá la contraseña (la que pusiste en la instalación)
4. Click derecho en "Databases" → "Create" → "Database..."
5. En "Database name" poner: `servicio_tesis_db`
6. Click "Save"

### Opción B: Usar línea de comandos

```powershell
# Te pedirá la contraseña
psql -U postgres -c "CREATE DATABASE servicio_tesis_db;"
```

---

## 📋 PASO 6: APLICAR MIGRACIONES DE DJANGO

```powershell
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser
```

---

## 📋 PASO 7: INICIAR EL SERVIDOR

```powershell
python manage.py runserver
```

---

## 🔍 VERIFICAR QUE FUNCIONA

```powershell
# Conectarse a la base de datos
psql -U postgres -d servicio_tesis_db

# Dentro de psql, listar tablas:
\dt

# Deberías ver las tablas de Django
# Salir:
\q
```

---

## 🐛 PROBLEMAS COMUNES

### "psql no se reconoce"

**Solución:** PostgreSQL no está en el PATH. 

**Opción 1:** Agregar al PATH manualmente:
1. Buscar la carpeta de instalación: `C:\Program Files\PostgreSQL\15\bin`
2. Agregar al PATH del sistema
3. Reiniciar terminal

**Opción 2:** Usar la ruta completa:
```powershell
& "C:\Program Files\PostgreSQL\15\bin\psql" --version
```

### "password authentication failed"

**Solución:** La contraseña en `.env` no coincide con la de PostgreSQL.
Edita `.env` y pon la contraseña correcta.

### "database does not exist"

**Solución:** No has creado la base de datos. Usa pgAdmin o el comando CREATE DATABASE.

---

## 📦 ALTERNATIVA: USAR SQLITE TEMPORALMENTE

Si quieres probar el backend rápidamente sin PostgreSQL, puedes temporalmente volver a SQLite:

En `settings.py`, cambia:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

Luego podrás cambiar a PostgreSQL más tarde.

---

## ✅ CHECKLIST

- [ ] PostgreSQL instalado
- [ ] `psql --version` funciona
- [ ] pgAdmin instalado
- [ ] Contraseña de postgres anotada
- [ ] Archivo `.env` actualizado con la contraseña correcta
- [ ] python-dotenv instalado
- [ ] psycopg2-binary instalado
- [ ] Base de datos `servicio_tesis_db` creada
- [ ] Migraciones aplicadas
- [ ] Servidor Django funciona

---

## 🎯 RESUMEN EJECUTIVO

1. **Descargar:** https://www.postgresql.org/download/windows/
2. **Instalar** PostgreSQL (recordar contraseña)
3. **Abrir** pgAdmin y crear base de datos `servicio_tesis_db`
4. **Editar** `.env` con tu contraseña
5. **Ejecutar:**
   ```powershell
   pip install python-dotenv psycopg2-binary
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

---

## 📞 AYUDA ADICIONAL

- **Documentación PostgreSQL:** https://www.postgresql.org/docs/
- **Tutorial pgAdmin:** https://www.pgadmin.org/docs/
- **Django con PostgreSQL:** https://docs.djangoproject.com/en/stable/ref/databases/#postgresql-notes

---

¿Tienes PostgreSQL instalado? Dime y continuamos con los siguientes pasos. 🚀
