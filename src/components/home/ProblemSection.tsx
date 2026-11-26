import React from 'react';
import { UserX, TrendingDown, AlertCircle, Layers, HelpCircle, Clock } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: 'Large Batches with Limited Personal Attention',
      description: 'In classrooms of 50 to 100+ students, it is virtually impossible for teachers to track your individual conceptual gaps or answer every doubt.',
      icon: UserX
    },
    {
      title: 'Low or Stagnant Mock Test Scores',
      description: 'You are studying 10 to 12 hours every day, but your score plateaued because generic mock tests are not paired with granular error diagnosis.',
      icon: TrendingDown
    },
    {
      title: 'Unresolved Doubts and Conceptual Gaps',
      description: 'Hesitation to ask questions in big classrooms leaves foundational doubts unresolved, turning small gaps into major exam mistakes.',
      icon: AlertCircle
    },
    {
      title: 'Fixed Syllabuses That Ignore Individual Weaknesses',
      description: 'Conventional coachings follow a rigid schedule. You are forced to sit through chapters you already understand while your weakest topics receive no extra time.',
      icon: Layers
    },
    {
      title: 'Confusion About Which Chapters to Prioritize',
      description: 'With limited days remaining before JEE Main 2027, students get overwhelmed deciding whether to revise Mechanics, Calculus, or Organic Chemistry.',
      icon: HelpCircle
    },
    {
      title: 'Lack of Personalized Guidance and Accountability',
      description: 'No one is monitoring your weekly progress, identifying why you made negative markings, or helping you manage exam pressure one-on-one.',
      icon: Clock
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 tracking-wide">
            THE REAL PREPARATION BOTTLENECK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Are You Studying Hard but Still Not Seeing Improvement?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every student has different academic weaknesses, but most coaching programmes follow the same syllabus for everyone.
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {idx + 1}. {problem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image & Closing Statement Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/5 shrink-0">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img
                src="/images/student-notes.jpg"
                alt="Student studying with handwritten notes and mock test preparation schedule"
                className="w-full h-56 object-cover"
                loading="lazy"
                width="400"
                height="224"
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 space-y-3">
            <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              The GapZero Insight
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-snug">
              &ldquo;The problem isn't always how much you study. It's whether you're studying what actually needs improvement.&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When preparation is customized to your exact weaknesses, 45 focused days yield dramatically higher score gains than months of generic classroom lectures.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
