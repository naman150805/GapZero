import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../config/programme';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            STEP-BY-STEP ADMISSION PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Your Personalized Preparation Journey Starts Here
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From your very first free counselling session to your 1:3 batch live classes, here is how GapZero guides you toward exam readiness.
          </p>
        </div>

        {/* 5-Step Modern Horizontal / Responsive Timeline */}
        <div className="relative mb-14">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((s, index) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-blue-400 hover:shadow-premium transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      {index + 1}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/book-counselling"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md hover:shadow-lg transition-all"
          >
            <span>Book My Free Counselling</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
