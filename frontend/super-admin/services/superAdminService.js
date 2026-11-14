const API_BASE = '/api';

const getAuthHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const superAdminService = {
  async getDashboard() {
    try {
      const res = await fetch(`${API_BASE}/super-admin/dashboard`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('superAdminService.getDashboard fallback:', err.message);
      return null;
    }
  },

  async getUsers(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/super-admin/users?${query}`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('superAdminService.getUsers fallback:', err.message);
      return null;
    }
  },

  async createUser(userData) {
    const res = await fetch(`${API_BASE}/super-admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create user');
    return data.data;
  },

  async updateUserStatus(userId, isActive) {
    const res = await fetch(`${API_BASE}/super-admin/users/${userId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ isActive }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user status');
    return data.data;
  },

  async deleteUser(userId) {
    const res = await fetch(`${API_BASE}/super-admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete user');
    return data;
  },

  async getProperties() {
    try {
      const res = await fetch(`${API_BASE}/properties`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      console.warn('superAdminService.getProperties fallback:', err.message);
      return null;
    }
  },

  async createProperty(propertyData) {
    const res = await fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(propertyData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create land scheme');
    return data.data;
  },

  async getActivities() {
    try {
      const res = await fetch(`${API_BASE}/super-admin/activities`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('superAdminService.getActivities fallback:', err.message);
      return null;
    }
  },
};

