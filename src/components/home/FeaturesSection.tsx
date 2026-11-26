import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  GraduationCap,
  FileText,
  Layers,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  UserCheck,
  Compass,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { PROGRAMME_FEATURES } from '../../config/programme';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Users,
  Calendar,
  GraduationCap,
  FileText,
  Layers,
  HelpCircle,
  MessageSquareCheck: MessageSquare,
  CheckCircle2,
  UserCheck,
  Compass,
  Target,
  TrendingUp
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="programme" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            COMPLETE PREPARATION ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Everything You Need to Make Your Next 45 Days Count
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every feature of GapZero is specifically designed to maximize your JEE Main 2027 percentile through intensive, targeted personal coaching.
          </p>
        </div>

        {/* 12 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {PROGRAMME_FEATURES.map((feat) => {
            const Icon = iconMap[feat.icon] || CheckCircle2;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-premium hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-4 group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/book-counselling"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md hover:shadow-lg transition-all"
          >
            <span>Book Free Counselling</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
