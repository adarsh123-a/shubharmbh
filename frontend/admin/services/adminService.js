const API_BASE = '/api';

const getAuthHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const adminService = {
  async getDashboard() {
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('adminService.getDashboard fallback:', err.message);
      return null;
    }
  },

  async getTeam() {
    try {
      const res = await fetch(`${API_BASE}/admin/team`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('adminService.getTeam fallback:', err.message);
      return null;
    }
  },

  async createRM(rmData) {
    const res = await fetch(`${API_BASE}/admin/team/rm`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(rmData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create RM');
    return data.data;
  },

  async getBookings(status) {
    try {
      const url = status ? `${API_BASE}/admin/bookings?status=${status}` : `${API_BASE}/admin/bookings`;
      const res = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('adminService.getBookings fallback:', err.message);
      return null;
    }
  },

  async updateBookingStatus(id, payload) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update booking');
    return data.data;
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
      console.warn('adminService.getProperties fallback:', err.message);
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
    if (!res.ok) throw new Error(data.message || 'Failed to create property');
    return data.data;
  },
};
