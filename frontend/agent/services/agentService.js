const API_BASE = '/api';

const getAuthHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const agentService = {
  // Agent Performance KPIs (Sold properties & Commission earned)
  async getDashboard() {
    try {
      const res = await fetch(`${API_BASE}/agent/dashboard`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('agentService.getDashboard fallback:', err.message);
      return null;
    }
  },

  // View available land projects/schemes & plots
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
      console.warn('agentService.getProperties fallback:', err.message);
      return null;
    }
  },

  // Sold properties & Commission transaction history
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE}/agent/bookings`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      console.warn('agentService.getBookings fallback:', err.message);
      return null;
    }
  },

  // Agent's customer leads list
  async getCustomers() {
    try {
      const res = await fetch(`${API_BASE}/agent/customers`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      console.warn('agentService.getCustomers fallback:', err.message);
      return null;
    }
  },

  // Submit new customer lead (strictly Name, Email, Phone)
  async createCustomerLead({ name, email, phone }) {
    const res = await fetch(`${API_BASE}/agent/customers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: name.trim(),
        email: email ? email.trim() : '',
        phone: phone.trim(),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit customer lead');
    return data.data;
  },
};
