const getAuthApiUrl = () => {
  let base = (import.meta.env?.VITE_API_BASE || import.meta.env?.VITE_API_URL || '').trim();
  if (!base) {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return '/api/auth';
    }
    return 'https://shubharmbh.onrender.com/api/auth';
  }
  base = base.replace(/\/auth\/?$/, '').replace(/\/+$/, '');
  if (!base.endsWith('/api')) {
    base = `${base}/api`;
  }
  return `${base}/auth`;
};

const API_URL = getAuthApiUrl();

export const authService = {
  async register(data) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Registration failed');
    return result;
  },

  async login(identifier, password) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ identifier, password })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Login failed');
    return result;
  },

  async getMe() {
    const headers = { 'Content-Type': 'application/json' };
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`${API_URL}/me`, {
      headers,
      credentials: 'include'
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Unauthorized');
    return result;
  },

  async logout() {
    const res = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return await res.json();
  }
};

