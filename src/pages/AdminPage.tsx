import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { getCurrentAdminUser, signOutAdmin, AdminUser } from '../services/authService';

export const AdminPage: React.FC = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const existing = getCurrentAdminUser();
    if (existing) {
      setAdminUser(existing);
    }
    setCheckingAuth(false);
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setAdminUser(null);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Verifying administrator authorization...
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center px-4 py-12">
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <AdminDashboard user={adminUser} onLogout={handleLogout} />
  );
};
