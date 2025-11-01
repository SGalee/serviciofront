import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import DocenteLayout from './layouts/DocenteLayout';
import EstudianteLayout from './layouts/EstudianteLayout';

// Pages públicas
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import RecuperarContraseña from './pages/RecuperarContraseña';

// Pages protegidas - Compartidas
import Dashboard from './pages/Dashboard';
import Cuenta from './pages/Cuenta';
import Favoritos from './pages/Favoritos';

// Pages protegidas - Admin/Docente
import CrearTesis from './pages/CrearTesis';

// Pages protegidas - Solo Admin
import Usuarios from './pages/Usuarios';
import CrearUsuario from './pages/CrearUsuario';

// Not Found
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <div>
        <main className="pages-adresses">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recuperacion" element={<RecuperarContraseña />} />

            {/* Rutas protegidas - Administrador */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={ROLES.ADMIN}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="creartesis" element={<CrearTesis />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="crearusuario" element={<CrearUsuario />} />
              <Route path="cuenta" element={<Cuenta />} />
              <Route path="favoritos" element={<Favoritos />} />
            </Route>

            {/* Rutas protegidas - Docente */}
            <Route
              path="/docente"
              element={
                <ProtectedRoute allowedRoles={ROLES.DOCENTE}>
                  <DocenteLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/docente/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="creartesis" element={<CrearTesis />} />
              <Route path="cuenta" element={<Cuenta />} />
              <Route path="favoritos" element={<Favoritos />} />
            </Route>

            {/* Rutas protegidas - Estudiante */}
            <Route
              path="/estudiante"
              element={
                <ProtectedRoute allowedRoles={ROLES.ESTUDIANTE}>
                  <EstudianteLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/estudiante/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cuenta" element={<Cuenta />} />
              <Route path="favoritos" element={<Favoritos />} />
            </Route>

            {/* Ruta genérica protegida (redirige según rol) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>

            {/* 404 - Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
