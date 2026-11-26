import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  Loader2,
  ShieldAlert
} from 'lucide-react';

import {
  signInAdmin,
  AdminUser
} from '../../services/authService';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess
}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await signInAdmin(email, password);

      if (res.success && res.user) {
        setPassword('');
        onLoginSuccess(res.user);
      } else {
        setError(
          res.error || 'Invalid administrator credentials'
        );
      }
    } catch {
      setError('Failed to authenticate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-2xl border border-slate-200 shadow-xl p-8">

      <div className="text-center space-y-2 mb-8">

        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-6 h-6 text-[#2563EB]" />
        </div>

        <h2 className="text-2xl font-extrabold text-[#0F172A]">
          GapZero Admin Portal
        </h2>

        <p className="text-xs text-slate-500">
          Sign in to manage student counselling
          registrations and batch allocations.
        </p>

      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700"
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>

          <label
            htmlFor="admin-email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Admin Email Address
          </label>

          <div className="relative">

            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter administrator email"
              autoComplete="username"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2563EB]"
            />

          </div>

        </div>

        <div>

          <label
            htmlFor="admin-password"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Password
          </label>

          <div className="relative">

            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2563EB]"
            />

          </div>

        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0F172A] hover:bg-slate-800 transition shadow flex items-center justify-center gap-2 disabled:opacity-60"
        >

          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}

        </button>

      </form>

      <div className="mt-6 text-center text-[11px] text-slate-500">
        Restricted access. Authorized administrators only.
      </div>

    </div>
  );
};