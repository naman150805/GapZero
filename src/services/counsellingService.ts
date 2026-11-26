// Supabase integration for counselling registrations
// This file replaces the previous Firebase Firestore implementation.

import { CounsellingFormData, CounsellingLead, LeadStatus } from '../types/counselling';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function getHeaders() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    // Return the full representation after insert
    Prefer: 'return=representation',
  };
}

// Helper to transform form data to match DB column names
function transformToDb(form: CounsellingFormData) {
  // Convert preferredDate string to ISO date (YYYY-MM-DD) if possible
  const date = new Date(form.preferredDate as string);
  const isoDate = isNaN(date.getTime()) ? form.preferredDate : date.toISOString().split('T')[0];
  return {
    full_name: form.fullName,
    mobile_number: form.mobileNumber,
    email: form.email,
    academic_status: form.academicStatus,
    subjects: JSON.stringify(form.subjects),
    preparation_rating: form.preparationRating,
    mock_score: form.mockScore,
    has_attempted_mock: form.hasAttemptedMock,
    challenges: JSON.stringify(form.challenges),
    preferred_date: isoDate,
    preferred_time: form.preferredTime,
    parent_contact_number: form.parentContactNumber ?? null,
    guardian_consent: form.guardianConsent,
    terms_accepted: form.termsAccepted,
    // The following fields are managed server side or locally
    status: 'New',
    internal_notes: null,
    assigned_counsellor: null,
    paid_enrolments: null,
  };
}

/** Submit counselling registration to Supabase */
export async function submitCounsellingRegistration(formData: CounsellingFormData): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const payload = transformToDb(formData);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/counselling_leads`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase insert error:', err);
      throw new Error(err);
    }
    const data = await response.json();
    // Supabase returns an array with the inserted row(s)
    const inserted = Array.isArray(data) ? data[0] : data;
    return { success: true, id: inserted.id };
  } catch (error) {
    console.error('Failed to submit registration:', error);
    return { success: false, id: '', error: (error as Error).message };
  }
}

/** Fetch all leads for Admin Dashboard */
export async function fetchAllLeads(): Promise<CounsellingLead[]> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/counselling_leads?order=created_at.desc`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase fetch error:', err);
      throw new Error(err);
    }
    const rows = await response.json();
    // Map DB rows back to front‑end type
    return rows.map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      mobileNumber: row.mobile_number,
      email: row.email,
      academicStatus: row.academic_status,
      subjects: JSON.parse(row.subjects),
      preparationRating: row.preparation_rating,
      mockScore: row.mock_score,
      hasAttemptedMock: row.has_attempted_mock,
      challenges: JSON.parse(row.challenges),
      preferredDate: row.preferred_date,
      preferredTime: row.preferred_time,
      parentContactNumber: row.parent_contact_number ?? undefined,
      guardianConsent: row.guardian_consent,
      termsAccepted: row.terms_accepted,
      createdAt: row.created_at,
      status: row.status as LeadStatus,
      internalNotes: row.internal_notes ?? undefined,
      assignedCounsellor: row.assigned_counsellor ?? undefined,
      paidEnrolments: row.paid_enrolments ? JSON.parse(row.paid_enrolments) : undefined,
    }));
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    // Fallback to empty array to keep UI functional
    return [];
  }
}

/** Update lead details (status, notes, assignment, paid enrolments) */
export async function updateLeadDetails(
  leadId: string,
  updates: Partial<Pick<CounsellingLead, 'status' | 'internalNotes' | 'assignedCounsellor' | 'paidEnrolments'>>
): Promise<boolean> {
  try {
    // Build payload with matching column names
    const payload: any = {};
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.internalNotes !== undefined) payload.internal_notes = updates.internalNotes;
    if (updates.assignedCounsellor !== undefined) payload.assigned_counsellor = updates.assignedCounsellor;
    if (updates.paidEnrolments !== undefined) payload.paid_enrolments = JSON.stringify(updates.paidEnrolments);

    const response = await fetch(`${SUPABASE_URL}/rest/v1/counselling_leads?id=eq.${leadId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase update error:', err);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to update lead:', error);
    return false;
  }
}
