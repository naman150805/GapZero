import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_CONFIG } from '../../config/business';
import { FOOTER_LINKS } from '../../config/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo isLight />
            <p className="text-sm text-slate-300 font-medium italic">
              &ldquo;{BUSINESS_CONFIG.tagline}&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              GapZero bridges the gap between conventional mass-batch coaching and expensive 1:1 tutoring. We deliver personalized, small-batch (1:3) live JEE Main 2027 coaching taught by currently enrolled IIT Delhi students, with custom syllabuses tailored to each student's academic weaknesses.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-300">
              <a href={`tel:${BUSINESS_CONFIG.phoneClean}`} className="inline-flex items-center gap-2 hover:text-white transition">
                <Phone className="w-4 h-4 text-[#2563EB]" />
                <span>{BUSINESS_CONFIG.phoneFormatted}</span>
              </a>
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="inline-flex items-center gap-2 hover:text-white transition">
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>{BUSINESS_CONFIG.email}</span>
              </a>
              <div className="inline-flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>Enrolments close: {BUSINESS_CONFIG.enrolmentDeadline}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              45-Day Subjects
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_LINKS.subjects.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB]" />
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50 text-[11px] text-slate-300">
                  <span className="font-semibold text-white">Fee:</span> ₹5,000 / subject for 45-day personalized preparation.
                </div>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Policies & Admin
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1.5 rounded transition border border-slate-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 leading-normal">
          <p className="text-center md:text-left max-w-3xl">
            <span className="font-semibold text-slate-300">Disclaimer:</span> {BUSINESS_CONFIG.disclaimer}
          </p>
          <p className="text-center md:text-right shrink-0">
            Copyright &copy; {BUSINESS_CONFIG.copyrightYear} {BUSINESS_CONFIG.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
