import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const FreeCounsellingSection: React.FC = () => {
  const sessionBenefits = [
    'Understand your current preparation level and score range.',
    'Analyse your recent mock test performance and error tendencies.',
    'Identify weak chapters and conceptual gaps dragging down your rank.',
    'Understand your specific academic challenges (speed, accuracy, anxiety).',
    'Decide which chapters to prioritize during your remaining days.',
    'Develop a practical, realistic preparation strategy for January 2027.',
    'Understand whether personalized 1:3 coaching is suitable for you.'
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NO PAYMENT • NO OBLIGATION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Confused About What to Study Next? Let an IITian Help You.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Book a completely free 20-minute personalized counselling session with a currently enrolled IIT Delhi student.
              </p>

              {/* What happens in session */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  During this 20-minute session, we will help you:
                </p>
                {sessionBenefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/book-counselling"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
                >
                  <span>Book Your Free 20-Minute Counselling</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Free • Personalized Guidance • No Payment Required</span>
              </div>

            </div>

            {/* Right Column: Educational Photograph */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
                <img
                  src="/images/mentorship.jpg"
                  alt="Student in academic counselling discussion"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                  width="500"
                  height="320"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
