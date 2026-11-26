import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { COMPARISON_DATA } from '../../config/programme';

export const USPSection: React.FC = () => {
  return (
    <section id="why-gapzero" className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE GAPZERO DIFFERENTIATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Not Another Crash Course. A Programme Built Around You.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            GapZero personalizes not only the teaching experience with a 1:3 ratio, but also the topics being taught. We build your syllabus around your exact academic weaknesses.
          </p>
        </div>

        {/* Concrete Illustrative Example Box */}
        <div className="mb-16 bg-[#F8FAFC] border border-blue-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                Concrete Real-World Scenario
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
                How Syllabus Personalization Actually Works
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] text-xs font-semibold">
              *Illustrative Student Profile
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Scenario explanation */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Suppose you are already comfortable with <strong className="text-slate-900">Mechanics</strong>, but struggle with <strong className="text-red-600">Electrostatics</strong> and <strong className="text-red-600">Ray Optics</strong>.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                In conventional coaching, you are forced to attend 3 weeks of Mechanics revision lectures you don't need.
              </p>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-blue-50/80 p-3.5 rounded-xl border border-blue-100">
                With GapZero, your IIT Delhi tutor skips what you already know and redirects 100% of your teaching hours toward Electrostatics, Optics, and your personal weak chapters.
              </p>
            </div>

            {/* Visual Comparison Cards */}
            <div className="space-y-3">
              {/* Strong Topic Card */}
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-900">Mechanics (Kinematics & NLM)</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5 block">Your Current Status: Strong (Mock Accuracy 85%)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                    Fast-track / Doubts only
                  </span>
                </div>
              </div>

              {/* Weak Topic 1 Card */}
              <div className="bg-white p-4 rounded-xl border-2 border-blue-500 shadow-md flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#2563EB]" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-sm font-bold text-slate-900">Electrostatics & Gauss's Law</span>
                  </div>
                  <span className="text-xs text-red-600 font-medium mt-0.5 block">Current Status: Conceptual Gap (Mock Accuracy 30%)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white bg-[#2563EB] px-2.5 py-1 rounded-md shadow-sm">
                    Priority Focus #1
                  </span>
                </div>
              </div>

              {/* Weak Topic 2 Card */}
              <div className="bg-white p-4 rounded-xl border-2 border-blue-500 shadow-md flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#2563EB]" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-sm font-bold text-slate-900">Ray & Wave Optics</span>
                  </div>
                  <span className="text-xs text-red-600 font-medium mt-0.5 block">Current Status: Numerical Errors (Mock Accuracy 35%)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white bg-[#2563EB] px-2.5 py-1 rounded-md shadow-sm">
                    Priority Focus #2
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0F172A]">
              Conventional Coaching vs. GapZero
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Compare how our 1:3 personalized model fundamentally differs from mass coaching
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/3">
                    Feature
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/3">
                    Conventional Large-Batch Coaching
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50/70 w-1/3">
                    GapZero Personalized Sprint
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {COMPARISON_DATA.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-slate-600 flex items-center gap-2">
                      <X className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{row.conventional}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#0F172A] bg-blue-50/40">
                      <div className="flex items-center gap-2 text-[#2563EB]">
                        <Check className="w-4 h-4 text-[#2563EB] shrink-0 font-bold" />
                        <span>{row.gapZero}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/book-counselling"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
            >
              <span>Get Your Personalized Syllabus Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
