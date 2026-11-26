import React, { useState } from 'react';
import { Lock, Mail, KeyRound, Loader2, ShieldAlert, Sparkles } from 'lucide-react';
import { signInAdmin, DEMO_ADMIN_CREDENTIALS, AdminUser } from '../../services/authService';
import { isFirebaseConfigured } from '../../config/firebase';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState(DEMO_ADMIN_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_ADMIN_CREDENTIALS.password);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signInAdmin(email, password);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Invalid administrator credentials');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to authenticate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-6 h-6 text-[#2563EB]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F172A]">
          GapZero Admin Portal
        </h2>
        <p className="text-xs text-slate-500">
          Sign in to manage student counselling registrations and batch allocations
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gapzero.in"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Password
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2563EB]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0F172A] hover:bg-slate-800 transition shadow flex items-center justify-center gap-2"
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

      {/* Note for local testing */}
      <div className="mt-6 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-slate-600">
        <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Local Admin Credentials Configured:</span>
        </p>
        <p>Email: <code className="font-mono bg-white px-1 rounded">{DEMO_ADMIN_CREDENTIALS.email}</code></p>
        <p>Password: <code className="font-mono bg-white px-1 rounded">{DEMO_ADMIN_CREDENTIALS.password}</code></p>
        <p className="text-[10px] text-slate-500 mt-1">
          {isFirebaseConfigured
            ? 'Firebase Auth is active.'
            : 'Using local demo authentication. Cloud keys can be set in .env.'}
        </p>
      </div>

    </div>
  );
};
