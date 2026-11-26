import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { CounsellingForm } from '../components/counselling/CounsellingForm';
import { Logo } from '../components/common/Logo';
import { Footer } from '../components/common/Footer';
import { BUSINESS_CONFIG } from '../config/business';

export const BookCounsellingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      
      {/* Top Simple Header */}
      <header className="bg-white border-b border-slate-200/80 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#2563EB] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Heading & Trust Intro */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FREE 20-MINUTE 1:1 PERSONALIZED COUNSELLING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Take the First Step Towards Smarter JEE Preparation
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Fill in your details to register for a free personalized counselling session with an IIT Delhi student.
            </p>

            {/* Quick value badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>1:1 with an IIT Delhi Student</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>Weak Chapters Diagnosis</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Free • No Obligation</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <CounsellingForm />

          {/* Quick Help Callout */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <span>Questions before registering? Call admissions at </span>
            <a href={`tel:${BUSINESS_CONFIG.phoneClean}`} className="font-bold text-slate-800 hover:text-[#2563EB]">
              {BUSINESS_CONFIG.phone}
            </a>
            <span> or email </span>
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="font-bold text-slate-800 hover:text-[#2563EB]">
              {BUSINESS_CONFIG.email}
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
