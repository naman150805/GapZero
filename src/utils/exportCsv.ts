import { CounsellingLead } from '../types/counselling';

export function exportLeadsToCsv(leads: CounsellingLead[], filename = 'gapzero_counselling_leads.csv'): void {
  if (!leads.length) {
    alert('No leads to export.');
    return;
  }

  const headers = [
    'ID',
    'Date & Time',
    'Status',
    'Full Name',
    'Mobile Number',
    'Email Address',
    'Academic Status',
    'Selected Subjects',
    'Preparation Rating (1-10)',
    'Mock Score (/300)',
    'Preparation Challenges',
    'Preferred Date',
    'Preferred Time',
    'Parent Contact',
    'Assigned Counsellor',
    'Internal Notes',
    'UTM Source'
  ];

  const escapeField = (val: unknown): string => {
    if (val === undefined || val === null) return '""';
    const str = Array.isArray(val) ? val.join('; ') : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = leads.map(lead => [
    escapeField(lead.id),
    escapeField(new Date(lead.createdAt).toLocaleString('en-IN')),
    escapeField(lead.status),
    escapeField(lead.fullName),
    escapeField(lead.mobileNumber),
    escapeField(lead.email),
    escapeField(lead.academicStatus),
    escapeField(lead.subjects),
    escapeField(lead.preparationRating),
    escapeField(lead.hasAttemptedMock ? lead.mockScore : 'Not attempted'),
    escapeField(lead.challenges),
    escapeField(lead.preferredDate),
    escapeField(lead.preferredTime),
    escapeField(lead.parentContactNumber || 'N/A'),
    escapeField(lead.assignedCounsellor || 'Unassigned'),
    escapeField(lead.internalNotes || ''),
    escapeField(lead.utmSource || 'direct')
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
