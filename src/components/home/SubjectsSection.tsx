import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SUBJECTS_DATA } from '../../config/programme';

export const SubjectsSection: React.FC = () => {
  const subjectImages: Record<string, string> = {
    physics: '/images/physics.jpg',
    chemistry: '/images/chemistry.jpg',
    mathematics: '/images/mathematics.jpg'
  };

  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            CHOOSE YOUR FOCUS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Focus on the Subject You Need to Improve
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Enrol in individual subjects or combine multiple areas. Each subject gives you a dedicated IIT Delhi tutor and a personalized syllabus for 45 days.
          </p>
        </div>

        {/* 3 Large Subject Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {SUBJECTS_DATA.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Subject Image with Aspect Ratio */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={subjectImages[subject.id]}
                    alt={`${subject.name} JEE preparation concepts`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="192"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-sm border border-slate-200/80">
                      ₹5,000 / 45 Days
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-extrabold text-[#0F172A] mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] mb-3">
                    {subject.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {subject.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {subject.keyHighlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject CTA - pre-selects subject on booking page */}
              <div className="p-6 pt-0">
                <Link
                  to={`/book-counselling?subject=${subject.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
                >
                  <span>Book Free Counselling for {subject.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center text-xs text-slate-500">
          Need help in multiple subjects? You can select all relevant subjects during your free counselling registration.
        </div>

      </div>
    </section>
  );
};
