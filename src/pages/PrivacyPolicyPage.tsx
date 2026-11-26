import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Footer } from '../components/common/Footer';
import { BUSINESS_CONFIG } from '../config/business';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB]">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Notice of Unapproved Draft */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <span className="font-bold block uppercase tracking-wider">Draft Policy Document — Subject to Legal Review</span>
            This document is a working administrative draft and has not yet been approved as finalized legal terms. It is published for informational and development purposes.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Privacy Policy (Draft)</h1>
          <p className="text-xs text-slate-400">Last updated: November 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit a request for a free counselling session or enquire about the GapZero 45-day personalized preparation programme, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Student's full name, phone number, and email address.</li>
              <li>Academic status (Class 12, JEE Dropper, etc.).</li>
              <li>Subject preferences, self-reported mock test scores, and areas of conceptual difficulty.</li>
              <li>Parent or guardian contact information when voluntarily provided or required for minor consent.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Student Information</h2>
            <p>
              We use the collected information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Coordinate and conduct your free 20-minute 1:1 counselling session with an IIT Delhi student mentor.</li>
              <li>Form academically compatible small batches (1:3 ratio) and customize the preparation syllabus.</li>
              <li>Communicate administrative schedules, class links, and mock test assignments.</li>
            </ul>
            <p className="font-semibold text-slate-900">
              We never sell, rent, or transfer student academic data to advertising networks or external data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Contact for Privacy Enquiries</h2>
            <p>
              For queries regarding your personal data or to request data removal, contact us at{' '}
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-[#2563EB] font-bold underline">{BUSINESS_CONFIG.email}</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
