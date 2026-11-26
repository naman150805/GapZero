import React, { useState } from 'react';
import { X, Phone, Mail, Clock, Calendar, Save } from 'lucide-react';
import { CounsellingLead, LeadStatus } from '../../types/counselling';
import { updateLeadDetails } from '../../services/counsellingService';

interface LeadDetailModalProps {
  lead: CounsellingLead;
  onClose: () => void;
  onUpdated: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose, onUpdated }) => {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.internalNotes || '');
  const [assigned, setAssigned] = useState(lead.assignedCounsellor || '');
  const [paidPhysics, setPaidPhysics] = useState(Boolean(lead.paidEnrolments?.physics));
  const [paidChemistry, setPaidChemistry] = useState(Boolean(lead.paidEnrolments?.chemistry));
  const [paidMaths, setPaidMaths] = useState(Boolean(lead.paidEnrolments?.mathematics));
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateLeadDetails(lead.id, {
        status,
        internalNotes: notes,
        assignedCounsellor: assigned,
        paidEnrolments: {
          physics: paidPhysics,
          chemistry: paidChemistry,
          mathematics: paidMaths,
          enrolledAt: (paidPhysics || paidChemistry || paidMaths) ? new Date().toISOString() : undefined
        }
      });
      onUpdated();
      onClose();
    } catch (e) {
      alert('Failed to update lead details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{lead.fullName}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-[#2563EB]">
                {lead.academicStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Registered on {new Date(lead.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="w-4 h-4 text-[#2563EB]" />
            <span>Mobile: <a href={`tel:${lead.mobileNumber}`} className="font-bold underline">{lead.mobileNumber}</a></span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="w-4 h-4 text-[#2563EB]" />
            <span>Email: <a href={`mailto:${lead.email}`} className="font-bold underline">{lead.email}</a></span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span>Preferred Date: <strong className="font-bold text-[#2563EB]">{lead.preferredDate}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            <span>Preferred Slot: <strong className="font-bold">{lead.preferredTime}</strong></span>
          </div>
          {lead.parentContactNumber && (
            <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Parent Contact: <a href={`tel:${lead.parentContactNumber}`} className="font-bold underline">{lead.parentContactNumber}</a></span>
            </div>
          )}
        </div>

        {/* Academic Details */}
        <div className="space-y-3 text-xs">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Subjects:</span>
            <div className="flex gap-2">
              {lead.subjects.map(sub => (
                <span key={sub} className="px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-bold border border-blue-200">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Self-Assessment Rating:</span>
              <span className="text-lg font-extrabold text-[#0F172A]">{lead.preparationRating} / 10</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Mock Test Score:</span>
              <span className="text-lg font-extrabold text-[#0F172A]">
                {lead.hasAttemptedMock ? `${lead.mockScore} / 300` : 'Not attempted'}
              </span>
            </div>
          </div>

          {lead.challenges?.length > 0 && (
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Identified Preparation Challenges:</span>
              <div className="flex flex-wrap gap-1.5">
                {lead.challenges.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status, Counsellor & Notes Modification */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Lead Management &amp; Batch Assignment
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-200"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Counselling Scheduled">Counselling Scheduled</option>
                <option value="Counselling Completed">Counselling Completed</option>
                <option value="Converted">Converted</option>
                <option value="Not Converted">Not Converted</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assign Counsellor / Mentor</label>
              <input
                type="text"
                value={assigned}
                onChange={(e) => setAssigned(e.target.value)}
                placeholder="e.g. IIT Delhi Mentor Team A"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Paid Enrolment Tracking */}
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-emerald-800 block">
              Paid Subject Enrolments (₹5,000 / subject):
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-800">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paidPhysics}
                  onChange={(e) => setPaidPhysics(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Physics (₹5k)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paidChemistry}
                  onChange={(e) => setPaidChemistry(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Chemistry (₹5k)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paidMaths}
                  onChange={(e) => setPaidMaths(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Mathematics (₹5k)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Internal Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record feedback, diagnostic evaluation, batch pairing suggestions..."
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Lead Updates'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
