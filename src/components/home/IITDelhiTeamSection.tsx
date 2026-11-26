import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const IITDelhiTeamSection: React.FC = () => {
  const highlights = [
    'Recent JEE examination experience & real test psychology',
    'Strong conceptual understanding with intuitive shortcuts',
    'Practical problem-solving techniques for tough questions',
    'Personalized academic guidance tailored to your speed',
    'Empathy and deep understanding of examination pressure',
    'Realistic, stress-tested preparation strategies that work'
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
              <span>PEER MENTORSHIP & TEACHING EXCELLENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Learn From Those Who Have Already Cracked JEE
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Our team consists of <strong>10+ currently enrolled IIT Delhi students</strong> who understand the challenges, pressure and dedication required to prepare for JEE.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              Having experienced the examination journey themselves, they bring recent examination experience, conceptual understanding and practical preparation strategies to help students make the most of their remaining preparation time.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5 text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="font-medium text-xs sm:text-sm">{h}</span>
                </div>
              ))}
            </div>

            {/* Transparent Independence Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600 mt-4">
              <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-800">Transparency Notice:</strong> {BUSINESS_CONFIG.disclaimer} We do not display individual personal tutor profiles or ranks to protect student privacy and focus entirely on academic delivery.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/book-counselling"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
              >
                <span>Connect with an IIT Delhi Mentor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Educational Photograph */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="/images/study-group.jpg"
                  alt="Students studying collaboratively in academic setting"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>

              {/* Floating Stat Overlay */}
              <div className="absolute -bottom-5 -left-5 bg-[#0F172A] text-white p-4 rounded-xl shadow-xl border border-slate-700 max-w-xs">
                <div className="text-2xl font-extrabold text-[#2563EB]">10+ IITians</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Currently studying at IIT Delhi, mentoring in 1:3 batches.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
