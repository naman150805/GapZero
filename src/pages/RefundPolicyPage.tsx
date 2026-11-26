import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Footer } from '../components/common/Footer';
import { BUSINESS_CONFIG } from '../config/business';

export const RefundPolicyPage: React.FC = () => {
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
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <span className="font-bold block uppercase tracking-wider">Draft Policy Notice — Unapproved Terms</span>
            This cancellation and refund policy is a working draft framework. It is clearly identified as unapproved and not published as finalized terms.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Cancellation &amp; Refund Policy (Draft)</h1>
          <p className="text-xs text-slate-400">Last updated: November 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Free Counselling Session</h2>
            <p>
              The 20-minute 1:1 counselling session is 100% free of charge. No payment is requested, collected, or held during or prior to counselling.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Paid Programme Fee (₹5,000 / subject)</h2>
            <p>
              Because GapZero limits each batch to a maximum of 3 students and allocates currently enrolled IIT Delhi tutors on a dedicated schedule, subject enrolments are limited to 30 students.
            </p>
            <p>
              Draft principles for refund requests (to be finalized prior to payment collection launch):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cancellation requests received prior to batch commencement will be eligible for a full refund minus nominal processing charges.</li>
              <li>Batch adjustment requests (e.g. rescheduling or switching subjects) will be accommodated subject to tutor availability and batch compatibility.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Support Contact</h2>
            <p>
              For any clarification regarding batch enrolments or policies, contact{' '}
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-[#2563EB] font-bold underline">{BUSINESS_CONFIG.email}</a> or call {BUSINESS_CONFIG.phone}.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
