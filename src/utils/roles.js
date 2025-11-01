// Constantes de roles
export const ROLES = {
  ADMIN: 'admin',
  DOCENTE: 'docente',
  ESTUDIANTE: 'estudiante',
};

// Configuración de rutas por rol
export const ROLE_ROUTES = {
  [ROLES.ADMIN]: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/creartesis', name: 'Crear Tesis' },
    { path: '/usuarios', name: 'Gestión de Usuarios' },
    { path: '/crearusuario', name: 'Crear Usuario' },
    { path: '/tesis', name: 'Todas las Tesis' },
    { path: '/cuenta', name: 'Mi Cuenta' },
  ],
  [ROLES.DOCENTE]: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/creartesis', name: 'Crear Tesis' },
    { path: '/tesis', name: 'Mis Tesis' },
    { path: '/favoritos', name: 'Favoritos' },
    { path: '/cuenta', name: 'Mi Cuenta' },
  ],
  [ROLES.ESTUDIANTE]: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/tesis', name: 'Buscar Tesis' },
    { path: '/favoritos', name: 'Favoritos' },
    { path: '/cuenta', name: 'Mi Cuenta' },
  ],
};

// Permisos por rol
export const PERMISSIONS = {
  [ROLES.ADMIN]: {
    canCreateTesis: true,
    canEditTesis: true,
    canDeleteTesis: true,
    canManageUsers: true,
    canViewAllTesis: true,
  },
  [ROLES.DOCENTE]: {
    canCreateTesis: true,
    canEditTesis: true,
    canDeleteTesis: true,
    canManageUsers: false,
    canViewAllTesis: false,
  },
  [ROLES.ESTUDIANTE]: {
    canCreateTesis: false,
    canEditTesis: false,
    canDeleteTesis: false,
    canManageUsers: false,
    canViewAllTesis: false,
  },
};
