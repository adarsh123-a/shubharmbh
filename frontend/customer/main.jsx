import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CustomerApp from './CustomerApp.jsx';
import AgentApp from '../agent/AgentApp.jsx';
import RMApp from '../rm/RMApp.jsx';
import AdminApp from '../admin/AdminApp.jsx';
import SuperAdminApp from '../super-admin/SuperAdminApp.jsx';
import LoginApp from '../login/LoginApp.jsx';
import { authService } from '../login/services/authService.js';
import './styles/customer.css';

function clearLocalSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    sessionStorage.clear();
    document.cookie = 'token=; Max-Age=0; path=/;';
    document.cookie = 'user_role=; Max-Age=0; path=/;';
  }
}

function getStoredUser() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('auth_token');
  if (!token) return null;
  try {
    const user = JSON.parse(localStorage.getItem('user_info') || 'null');
    if (!user || !user.role) return null;
    return user;
  } catch {
    return null;
  }
}

function RootRouter() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [isVerifying, setIsVerifying] = useState(true);

  // Verify active session with MongoDB backend
  useEffect(() => {
    let isMounted = true;
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    if (!token) {
      clearLocalSession();
      if (isMounted) {
        setCurrentUser(null);
        setIsVerifying(false);
      }
      return;
    }

    authService
      .getMe()
      .then((res) => {
        if (isMounted) {
          if (res?.user) {
            localStorage.setItem('user_info', JSON.stringify(res.user));
            setCurrentUser(res.user);
          } else {
            clearLocalSession();
            setCurrentUser(null);
          }
          setIsVerifying(false);
        }
      })
      .catch(() => {
        // User was deleted from MongoDB or token is invalid
        clearLocalSession();
        if (isMounted) {
          setCurrentUser(null);
          setIsVerifying(false);
        }
      });

    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      isMounted = false;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  const path = pathname.replace(/\/+$/, '') || '/';

  // While verifying existing token with MongoDB backend
  if (isVerifying && typeof window !== 'undefined' && localStorage.getItem('auth_token')) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#F8FAFC',
          color: '#64748B',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        Verifying security session...
      </div>
    );
  }

  // 1. If at /login or no user is authenticated, ALWAYS show LoginApp!
  if (path === '/login' || !currentUser) {
    return <LoginApp />;
  }

  // 2. Strict Per-Portal Route Protection:
  // A. Super Admin Portal
  if (path === '/super-admin') {
    if (currentUser.role !== 'super_admin') {
      window.location.replace('/login?role=super_admin');
      return null;
    }
    return <SuperAdminApp />;
  }

  // B. Admin Console
  if (path === '/admin') {
    if (currentUser.role !== 'admin' && currentUser.role !== 'super_admin') {
      window.location.replace('/login?role=admin');
      return null;
    }
    return <AdminApp />;
  }

  // C. RM Dashboard
  if (path === '/rm') {
    if (currentUser.role !== 'rm' && currentUser.role !== 'admin' && currentUser.role !== 'super_admin') {
      window.location.replace('/login?role=rm');
      return null;
    }
    return <RMApp />;
  }

  // D. Agent Portal
  if (path === '/agent') {
    if (currentUser.role !== 'agent' && currentUser.role !== 'rm' && currentUser.role !== 'admin' && currentUser.role !== 'super_admin') {
      window.location.replace('/login?role=agent');
      return null;
    }
    return <AgentApp />;
  }

  // 3. Customer Portal (Root /)
  if (currentUser.role === 'customer') {
    return <CustomerApp />;
  }

  // If a team member opens /, ask them to sign in as customer to view customer portal
  return <LoginApp />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
