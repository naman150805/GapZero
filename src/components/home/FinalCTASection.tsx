import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Subtle blue accent background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIMITED TO 10 BATCHES FOR JANUARY 2027</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Every Day Matters.{' '}
              <span className="text-blue-400">Make Your Preparation Count.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              You don't need to study everything again. You need to focus on what matters most for your preparation. Start with a free personalized counselling session and discover where you can improve.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/book-counselling"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-blue-600 shadow-xl transition-all hover:-translate-y-0.5"
              >
                <span>Book My Free Counselling Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero obligation • 20 minutes with an IIT Delhi mentor • Closes before {BUSINESS_CONFIG.enrolmentDeadline}</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/60 bg-slate-800">
              <img
                src="/images/hero-student.jpg"
                alt="Student studying with dedication for competitive examinations"
                className="w-full h-80 object-cover object-center opacity-90"
                loading="lazy"
                width="500"
                height="320"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
