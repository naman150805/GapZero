import React from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const ContactSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappMessage)}`;

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] tracking-wide">
            DIRECT STUDENT &amp; PARENT SUPPORT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Have Questions? We're Here to Help.
          </h2>
          <p className="text-base text-slate-600">
            Reach out directly to the GapZero academic coordination team. We are happy to discuss your preparation situation and answers all questions.
          </p>
        </div>

        {/* 3 Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Phone */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 text-center flex flex-col justify-between hover:border-blue-300 transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us Directly</h3>
              <p className="text-xs text-slate-500 mb-4">Speak with an academic counsellor</p>
              <p className="text-base font-extrabold text-[#0F172A]">{BUSINESS_CONFIG.phoneFormatted}</p>
            </div>
            <div className="pt-6">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneClean}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0F172A] hover:bg-slate-800 transition"
              >
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 text-center flex flex-col justify-between hover:border-blue-300 transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
              <p className="text-xs text-slate-500 mb-4">Write to our admissions team</p>
              <p className="text-sm font-bold text-slate-800 break-all">{BUSINESS_CONFIG.email}</p>
            </div>
            <div className="pt-6">
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition"
              >
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 text-center flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-[#25D366] flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500 mb-4">Quick replies on WhatsApp</p>
              <p className="text-sm font-bold text-emerald-700">Instant Chat Available</p>
            </div>
            <div className="pt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-emerald-600 transition"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Operating hours info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            <span>Support Hours: 9:00 AM – 9:00 PM IST (Mon – Sun)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            <span>Online Live Coaching across India</span>
          </div>
        </div>

      </div>
    </section>
  );
};
