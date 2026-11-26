import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  LogOut,
  ArrowUpDown,
  Calendar,
  Clock
} from 'lucide-react';
import { CounsellingLead, LeadStatus } from '../../types/counselling';
import { fetchAllLeads, updateLeadDetails } from '../../services/counsellingService';
import { AdminUser } from '../../services/authService';
import { exportLeadsToCsv } from '../../utils/exportCsv';
import { LeadDetailModal } from './LeadDetailModal';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [leads, setLeads] = useState<CounsellingLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedLead, setSelectedLead] = useState<CounsellingLead | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch (e) {
      console.error('Error fetching leads:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Quick stats calculation
  const totalRegistrations = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const scheduledLeads = leads.filter(l => l.status === 'Counselling Scheduled').length;
  const completedLeads = leads.filter(l => l.status === 'Counselling Completed').length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;
  const notConvertedLeads = leads.filter(l => l.status === 'Not Converted').length;

  // Paid enrolments calculation
  let paidSubjectCount = 0;
  leads.forEach(l => {
    if (l.paidEnrolments?.physics) paidSubjectCount++;
    if (l.paidEnrolments?.chemistry) paidSubjectCount++;
    if (l.paidEnrolments?.mathematics) paidSubjectCount++;
  });

  // Filtering & Sorting
  const filteredLeads = leads
    .filter(lead => {
      // Search filter matches name, mobile, email, or preferredDate
      const matchesSearch =
        lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.mobileNumber.includes(searchQuery) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.preferredDate && lead.preferredDate.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

      // Subject filter
      const matchesSubject = subjectFilter === 'All' || lead.subjects.includes(subjectFilter as any);

      return matchesSearch && matchesStatus && matchesSubject;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });

  const handleExport = () => {
    exportLeadsToCsv(filteredLeads, `gapzero_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleQuickStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadDetails(leadId, { status: newStatus });
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* Top Navbar */}
      <header className="bg-[#0F172A] text-white py-4 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center font-extrabold text-white text-sm">
              G0
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none">
                Gap<span className="text-[#2563EB]">Zero</span> Admissions CRM
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Logged in as: <span className="text-slate-300 font-mono">{user.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI / Overview Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Total Leads</span>
            <span className="text-2xl font-extrabold text-[#0F172A]">{totalRegistrations}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs bg-blue-50/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] block">New Leads</span>
            <span className="text-2xl font-extrabold text-[#2563EB]">{newLeads}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Contacted</span>
            <span className="text-2xl font-extrabold text-slate-800">{contactedLeads}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs bg-amber-50/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">Scheduled</span>
            <span className="text-2xl font-extrabold text-amber-700">{scheduledLeads}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Completed</span>
            <span className="text-2xl font-extrabold text-slate-800">{completedLeads}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs bg-emerald-50/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Converted</span>
            <span className="text-2xl font-extrabold text-emerald-700">{convertedLeads}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Not Converted</span>
            <span className="text-2xl font-extrabold text-slate-600">{notConvertedLeads}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-emerald-500 shadow-sm bg-emerald-50/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">Paid Enrolments</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-700">{paidSubjectCount}</span>
              <span className="text-[11px] text-slate-500 font-semibold">/ 30 Max</span>
            </div>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, phone, email, or date..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2563EB]"
              />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Counselling Scheduled">Counselling Scheduled</option>
                  <option value="Counselling Completed">Counselling Completed</option>
                  <option value="Converted">Converted</option>
                  <option value="Not Converted">Not Converted</option>
                </select>
              </div>

              {/* Subject Filter */}
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-200"
              >
                <option value="All">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>

              {/* Sort By */}
              <button
                onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{sortBy === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              </button>

              {/* Export CSV */}
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV ({filteredLeads.length})</span>
              </button>

            </div>
          </div>
        </div>

        {/* Lead Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Registered Leads ({filteredLeads.length})
            </h3>
            <span className="text-xs text-slate-400">
              Click any student row to view diagnostic details &amp; edit notes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Preferred Slot</th>
                  <th className="py-3 px-4">Subjects</th>
                  <th className="py-3 px-4">Rating / Mock</th>
                  <th className="py-3 px-4">Lead Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No matching counselling registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusColors: Record<LeadStatus, string> = {
                      'New': 'bg-blue-100 text-[#2563EB]',
                      'Contacted': 'bg-slate-100 text-slate-700',
                      'Counselling Scheduled': 'bg-amber-100 text-amber-800',
                      'Counselling Completed': 'bg-purple-100 text-purple-700',
                      'Converted': 'bg-emerald-100 text-emerald-800 font-bold',
                      'Not Converted': 'bg-red-100 text-red-700'
                    };

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-blue-50/40 cursor-pointer transition"
                      >
                        {/* Student */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 text-sm">{lead.fullName}</div>
                          <div className="text-[11px] text-slate-400">{lead.academicStatus}</div>
                          <div className="text-[10px] text-slate-400">
                            Registered: {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{lead.mobileNumber}</div>
                          <div className="text-slate-500 text-[11px] truncate max-w-[150px]">{lead.email}</div>
                          {lead.parentContactNumber && (
                            <div className="text-[10px] text-slate-400">Parent: {lead.parentContactNumber}</div>
                          )}
                        </td>

                        {/* Preferred Slot (Date & Time) */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>{lead.preferredDate || 'Not specified'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>Slot: {lead.preferredTime}</span>
                          </div>
                          {lead.assignedCounsellor ? (
                            <span className="text-[10px] text-slate-400 block mt-0.5">Mentor: {lead.assignedCounsellor}</span>
                          ) : (
                            <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">Unassigned</span>
                          )}
                        </td>

                        {/* Subjects */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {lead.subjects.map(s => (
                              <span key={s} className="px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB] text-[10px] font-bold border border-blue-100">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Prep Rating & Mock */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">Rating: {lead.preparationRating}/10</div>
                          <div className="text-[11px] text-slate-500">
                            Mock: {lead.hasAttemptedMock ? `${lead.mockScore}/300` : 'Not attempted'}
                          </div>
                        </td>

                        {/* Lead Status dropdown */}
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleQuickStatusChange(lead.id, e.target.value as LeadStatus)}
                            className={`px-2 py-1 rounded-md text-xs font-bold border focus:outline-none ${statusColors[lead.status] || 'bg-slate-100'}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Counselling Scheduled">Scheduled</option>
                            <option value="Counselling Completed">Completed</option>
                            <option value="Converted">Converted</option>
                            <option value="Not Converted">Not Converted</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Modal for detailed view and updates */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdated={loadData}
        />
      )}

    </div>
  );
};
