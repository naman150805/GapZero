import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Calendar, Users, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const PricingSection: React.FC = () => {
  const inclusions = [
    'Maximum three students per batch (1:3 ratio)',
    'Four 90-minute live classes every week (6 hours/week)',
    'Teaching by currently enrolled IIT Delhi students',
    'Personalized syllabus based on your weak chapters',
    'Doubt solving during every regular class',
    'Dedicated weekend doubt-clearing session',
    '20+ mock tests with weak-chapter diagnosis',
    'Weekly private 20-minute mentorship session',
    'Personalized weekly study roadmap',
    'Examination strategy, revision and stress guidance',
    'Continuous performance monitoring and batch syncing'
  ];

  return (
    <section id="pricing" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            TRANSPARENT, VALUE-FOCUSED PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Premium Personal Attention. Affordable Pricing.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            High-quality personalized coaching should not cost hundreds of thousands of rupees. We charge a straightforward fee with no hidden costs.
          </p>
        </div>

        {/* Prominent Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#F8FAFC] rounded-3xl border-2 border-[#2563EB] shadow-xl overflow-hidden relative">
            
            {/* Top Highlight Banner */}
            <div className="bg-[#2563EB] text-white py-2.5 px-6 text-center text-xs sm:text-sm font-bold tracking-wide">
              {BUSINESS_CONFIG.targetExam.toUpperCase()} — 45-DAY PERSONALIZED SPRINT
            </div>

            <div className="p-8 sm:p-10 space-y-8">
              
              {/* Price display */}
              <div className="text-center space-y-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight">
                    ₹5,000
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-500">
                    / subject
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  For the complete 45-day personalized preparation programme
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <span>Available for Physics, Chemistry &amp; Mathematics</span>
                </div>
              </div>

              {/* What's included */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-left">
                  Everything Included in the Programme:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {inclusions.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#2563EB]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  to="/book-counselling"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md hover:shadow-lg transition-all"
                >
                  <span>Book Free Counselling</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-center text-xs text-slate-500 mt-2.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No payment required for counselling • Discuss syllabus before enrolling</span>
                </p>
              </div>

              {/* Factual Availability Information (Strictly factual, no fake countdowns) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Important Enrolment Details:</span>
                </div>
                <ul className="space-y-1.5 pl-6 list-disc text-slate-600">
                  <li><strong>Only 10 batches</strong> are planned for the initial launch.</li>
                  <li><strong>Maximum 30 paid subject enrolments</strong> to strictly maintain 1:3 teaching quality.</li>
                  <li>Enrolments close before <strong>{BUSINESS_CONFIG.enrolmentDeadline}</strong>.</li>
                  <li>Batch allocation depends on academic compatibility and tutor availability.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
