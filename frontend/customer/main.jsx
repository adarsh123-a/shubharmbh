import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CustomerApp from './CustomerApp.jsx';
import AgentApp from '../agent/AgentApp.jsx';
import RMApp from '../rm/RMApp.jsx';
import AdminApp from '../admin/AdminApp.jsx';
import SuperAdminApp from '../super-admin/SuperAdminApp.jsx';
import LoginApp from '../login/LoginApp.jsx';
import './styles/customer.css';

function RootRouter() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (pathname === '/login' || pathname.startsWith('/login/')) {
    return <LoginApp />;
  }

  if (pathname === '/agent' || pathname.startsWith('/agent/')) {
    return <AgentApp />;
  }

  if (pathname === '/rm' || pathname.startsWith('/rm/')) {
    return <RMApp />;
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return <AdminApp />;
  }

  if (pathname === '/super-admin' || pathname.startsWith('/super-admin/')) {
    return <SuperAdminApp />;
  }

  return <CustomerApp />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);

