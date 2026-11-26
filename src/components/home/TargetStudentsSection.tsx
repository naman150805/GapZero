import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const TargetStudentsSection: React.FC = () => {
  const targetProfiles = [
    'Class 12 JEE aspirants seeking focused revision on tough chapters before the January 2027 attempt.',
    'JEE Droppers needing intensive problem-solving precision and elimination of persistent error patterns.',
    'Students struggling with particular chapters or subjects (e.g. Optics, Electrostatics, Calculus, Organic Chemistry).',
    'Students whose mock test scores are stagnant despite studying 8 to 12 hours every day.',
    'Students who have completed part of the syllabus but need targeted improvement on high-weightage concepts.',
    'Students receiving insufficient personal attention from large commercial coaching institutes.',
    'Students who need personalized guidance, weekly mentorship, and strict accountability from IITians.'
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            AUDIENCE ALIGNMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Is GapZero Right for You?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our personalized 1:3 coaching model is engineered specifically for JEE Main 2027 aspirants who want high-efficiency academic progress without time wastage.
          </p>
        </div>

        {/* Content & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Target List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              This programme is specifically designed for:
            </h3>

            <div className="space-y-3">
              {targetProfiles.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex items-start gap-3 hover:border-blue-300 transition"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/book-counselling"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
              >
                <span>Check Your Fit in Free Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
              <img
                src="/images/mentorship.jpg"
                alt="Student receiving individual personalized academic mentorship"
                className="w-full h-[440px] object-cover"
                loading="lazy"
                width="600"
                height="440"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs sm:text-sm font-semibold">
                  Personalized attention turns preparation anxiety into targeted clarity.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
