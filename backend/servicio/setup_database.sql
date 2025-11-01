-- Script para crear la base de datos en PostgreSQL

-- 1. Conectarse a PostgreSQL como superusuario
-- psql -U postgres

-- 2. Crear la base de datos
CREATE DATABASE servicio_tesis_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE servicio_tesis_db
    IS 'Base de datos para el sistema de gestión de tesis';

-- 3. (Opcional) Crear un usuario específico para la aplicación
-- CREATE USER servicio_user WITH PASSWORD 'tu_password_seguro';
-- GRANT ALL PRIVILEGES ON DATABASE servicio_tesis_db TO servicio_user;

-- 4. Conectarse a la base de datos
\c servicio_tesis_db

-- 5. (Opcional) Instalar extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Para búsquedas de texto más eficientes

-- 6. Verificar la conexión
SELECT version();
