import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isEnabled = import.meta.env.VITE_ENABLE_WHATSAPP_FLOAT !== 'false';

  if (!isEnabled) return null;

  const encodedMessage = encodeURIComponent(BUSINESS_CONFIG.whatsappMessage);
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Interactive Tooltip bubble */}
      {showTooltip && (
        <div className="bg-white text-slate-800 p-3.5 rounded-xl shadow-xl border border-slate-200 max-w-xs text-xs relative animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-slate-900 mb-1">Chat with GapZero Admissions</p>
          <p className="text-slate-600 mb-2">Have a question about our 45-day personalized JEE batch or free counselling?</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 underline"
          >
            Start WhatsApp Chat &rarr;
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat on WhatsApp"
        title="Chat with GapZero on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
