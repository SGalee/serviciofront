const BASE_URL = 'http://localhost:8000';

type TokenPair = { access: string; refresh: string };
type TesisPayload = {
  titulo?: string;
  resumen?: string;
  tutor?: string;
  anio?: string | number;
  autor1?: string;
  autor2?: string;
  tipo?: string;
  archivo?: File | null;
};

async function handleResponse(res: Response) {
  const contentType = res.headers.get('content-type') || '';
  if (res.ok) {
    if (contentType.includes('application/json')) return res.json();
    return res.text();
  }
  // intentar obtener error JSON si está disponible
  const errorBody = contentType.includes('application/json') ? await res.json() : await res.text();
  const err = new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
  // @ts-ignore
  err.status = res.status;
  throw err;
}

function authHeader(token?: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {} as Record<string, string>;
}

/* Auth endpoints */
export async function login(username: string, password: string): Promise<TokenPair> {
  const res = await fetch(`${BASE_URL}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
}

export async function refreshToken(refresh: string): Promise<{ access: string }> {
  const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });
  return handleResponse(res);
}

export async function registerUser(payload: { username: string; password: string; email?: string; [k: string]: any }) {
  const res = await fetch(`${BASE_URL}/api/registro/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

/* Tesis endpoints */
// lista tesis
export async function listTesis(token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/tesis/`, {
    method: 'GET',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

// detalle
export async function getTesis(id: number | string, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/tesis/${id}/`, {
    method: 'GET',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

// crear (soporta archivo: tesis.archivo -> File). Usa multipart/form-data si hay archivo.
export async function createTesis(tesis: TesisPayload, token?: string | null) {
  const hasFile = Boolean(tesis.archivo);
  let options: RequestInit;
  if (hasFile) {
    const fd = new FormData();
    if (tesis.titulo) fd.append('titulo', String(tesis.titulo));
    if (tesis.resumen) fd.append('resumen', String(tesis.resumen));
    if (tesis.tutor) fd.append('tutor', String(tesis.tutor));
    if (tesis.anio) fd.append('anio', String(tesis.anio));
    if (tesis.autor1) fd.append('autor1', String(tesis.autor1));
    if (tesis.autor2) fd.append('autor2', String(tesis.autor2));
    if (tesis.tipo) fd.append('tipo', String(tesis.tipo));
    if (tesis.archivo) fd.append('archivo', tesis.archivo);
    options = {
      method: 'POST',
      headers: { ...authHeader(token) }, // no Content-Type para FormData
      body: fd,
    };
  } else {
    options = {
      method: 'POST',
      headers: { ...authHeader(token), 'Content-Type': 'application/json' },
      body: JSON.stringify(tesis),
    };
  }
  const res = await fetch(`${BASE_URL}/api/tesis/`, options);
  return handleResponse(res);
}

// actualizar parcialmente (PATCH). Soporta envío multipart si archivo presente.
export async function updateTesis(id: number | string, tesis: TesisPayload, token?: string | null) {
  const hasFile = Boolean(tesis.archivo);
  let options: RequestInit;
  if (hasFile) {
    const fd = new FormData();
    if (tesis.titulo) fd.append('titulo', String(tesis.titulo));
    if (tesis.resumen) fd.append('resumen', String(tesis.resumen));
    if (tesis.tutor) fd.append('tutor', String(tesis.tutor));
    if (tesis.anio) fd.append('anio', String(tesis.anio));
    if (tesis.autor1) fd.append('autor1', String(tesis.autor1));
    if (tesis.autor2) fd.append('autor2', String(tesis.autor2));
    if (tesis.tipo) fd.append('tipo', String(tesis.tipo));
    if (tesis.archivo) fd.append('archivo', tesis.archivo);
    options = {
      method: 'PATCH',
      headers: { ...authHeader(token) },
      body: fd,
    };
  } else {
    options = {
      method: 'PATCH',
      headers: { ...authHeader(token), 'Content-Type': 'application/json' },
      body: JSON.stringify(tesis),
    };
  }
  const res = await fetch(`${BASE_URL}/api/tesis/${id}/`, options);
  return handleResponse(res);
}

export async function deleteTesis(id: number | string, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/tesis/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeader(token), 'Content-Type': 'application/json' },
  });
  return handleResponse(res);
}

/* User Profile endpoints */
// Obtener perfil del usuario actual
export async function getUserProfile(token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/perfil/`, {
    method: 'GET',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

// Actualizar perfil del usuario
export async function updateUserProfile(payload: any, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/perfil/`, {
    method: 'PATCH',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

/* User Management endpoints (solo para admin) */
// Listar todos los usuarios
export async function listUsers(token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/usuarios/`, {
    method: 'GET',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

// Obtener un usuario específico
export async function getUser(id: number | string, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/usuarios/${id}/`, {
    method: 'GET',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

// Crear usuario (admin)
export async function createUser(payload: any, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/usuarios/`, {
    method: 'POST',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// Actualizar usuario
export async function updateUser(id: number | string, payload: any, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/usuarios/${id}/`, {
    method: 'PATCH',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// Eliminar usuario
export async function deleteUser(id: number | string, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/usuarios/${id}/`, {
    method: 'DELETE',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

/* Favoritos endpoints */
// Listar favoritos del usuario
export async function listFavoritos(token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/favoritos/`, {
    method: 'GET',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

// Agregar tesis a favoritos
export async function addFavorito(tesisId: number | string, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/favoritos/`, {
    method: 'POST',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tesis_id: tesisId }),
  });
  return handleResponse(res);
}

// Eliminar de favoritos
export async function removeFavorito(id: number | string, token?: string | null) {
  const res = await fetch(`${BASE_URL}/api/favoritos/${id}/`, {
    method: 'DELETE',
    headers: {
      ...authHeader(token),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

/* Helper: obtener rutas del browsable API (opcional) */
export async function apiRoot() {
  const res = await fetch(`${BASE_URL}/api/`);
  return handleResponse(res);
}

const api = {
  login,
  refreshToken,
  registerUser,
  getUserProfile,
  updateUserProfile,
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  listTesis,
  getTesis,
  createTesis,
  updateTesis,
  deleteTesis,
  listFavoritos,
  addFavorito,
  removeFavorito,
  apiRoot,
};

export default api;
