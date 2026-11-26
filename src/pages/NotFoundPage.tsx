import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-center">
      <Logo className="mb-8" />
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full space-y-4">
        <span className="text-5xl font-extrabold text-[#2563EB]">404</span>
        <h1 className="text-2xl font-bold text-[#0F172A]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The page you are looking for might have been moved or does not exist.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
          >
            <Home className="w-4 h-4" />
            <span>Back to GapZero Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
