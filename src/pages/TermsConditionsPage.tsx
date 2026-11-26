import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Footer } from '../components/common/Footer';
import { BUSINESS_CONFIG } from '../config/business';

export const TermsConditionsPage: React.FC = () => {
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
            <span className="font-bold block uppercase tracking-wider">Draft Terms &amp; Conditions — Pending Legal Ratification</span>
            This policy document is a draft version intended to communicate operating expectations and is not yet ratified as final binding terms.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Terms and Conditions (Draft)</h1>
          <p className="text-xs text-slate-400">Last updated: November 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Nature of Services</h2>
            <p>
              GapZero provides online academic tutoring and mentorship for competitive examination preparation (JEE Main 2027) through currently enrolled IIT Delhi students.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Independent Status &amp; Institutional Disclaimer</h2>
            <p>
              {BUSINESS_CONFIG.disclaimer} The use of the name of IIT Delhi is strictly factual to reflect the current educational enrollment of the tutors and mentors, and implies no institutional endorsement, official backing, or affiliation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Examination Results &amp; Disclaimer of Guarantees</h2>
            <p>
              GapZero provides personalized guidance, academic coaching, and diagnostic analysis. GapZero does not and cannot guarantee any specific JEE rank, percentile, marks, or college admission. Competitive examination outcomes depend on individual student dedication, self-study, and examination conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Batch Structure &amp; Code of Conduct</h2>
            <p>
              Live sessions operate with a maximum ratio of 1 tutor to 3 students. All participants are expected to maintain respect, discipline, and regular attendance during live classes.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
