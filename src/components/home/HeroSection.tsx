import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC]">
      {/* Background Decorative Accent Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#2563EB] tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>JEE MAIN JANUARY 2027 — ENROLMENTS OPEN</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Your Preparation Is Unique.{' '}
              <span className="text-[#2563EB]">Your Coaching Should Be Too.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Stop spending valuable preparation time studying what you already know. Get personalized JEE coaching from currently enrolled IIT Delhi students, focused specifically on your weak chapters, conceptual gaps and individual preparation needs.
            </p>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Learn from IIT Delhi students',
                'Maximum 3 students per batch',
                'Personalized syllabus',
                'Weekly individual mentorship'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/book-counselling"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#programme"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all text-center"
              >
                Explore Programme
              </a>
            </div>

            {/* Trust Text & Deadline */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-600 border-t border-slate-200/60 mt-4">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free 20-minute session • No payment required • No obligation</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5 font-semibold text-amber-700">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Enrolments close before {BUSINESS_CONFIG.enrolmentDeadline}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame with rounded corners & shadow */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/images/hero-student.jpg"
                  alt="Focused student preparing for JEE Main examination with laptop and study materials"
                  className="w-full h-[420px] object-cover object-center transform hover:scale-102 transition duration-500"
                  loading="eager"
                  width="600"
                  height="420"
                />
                
                {/* Floating Ratio Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900">1:3 Ratio Live Batches</span>
                </div>

                {/* Floating IIT Delhi Badge */}
                <div className="absolute bottom-4 right-4 bg-[#0F172A]/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs font-bold tracking-tight">Mentored by IIT Delhi Students</span>
                </div>
              </div>

              {/* Decorative background box */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-slate-200/60 rounded-2xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
