import React from 'react';
import { Users, UserCheck, CalendarDays, CheckCircle2 } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    {
      value: '10+',
      label: 'IIT Delhi Tutors',
      description: 'Currently enrolled students teaching conceptual clarity',
      icon: Users,
      badge: 'Peer Mentorship'
    },
    {
      value: '1:3',
      label: 'Tutor-to-Student Ratio',
      description: 'Maximum 3 students per batch for direct personal attention',
      icon: UserCheck,
      badge: 'Personal Attention'
    },
    {
      value: '45 Days',
      label: 'Personalized Preparation',
      description: 'High-impact intensive sprint for JEE Main January 2027',
      icon: CalendarDays,
      badge: 'Targeted Sprint'
    },
    {
      value: '20+',
      label: 'Mock Tests',
      description: 'Continuous assessment with weak-chapter diagnosis',
      icon: CheckCircle2,
      badge: 'Rigorous Practice'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-premium transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-100/60 px-2 py-0.5 rounded-full">
                    {stat.badge}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
