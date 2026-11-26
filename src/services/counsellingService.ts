import {
  CounsellingFormData,
  CounsellingLead,
  LeadStatus
} from '../types/counselling';

import { supabase } from '../config/supabase';
import { getCurrentAdminUser } from './authService';

// Convert form data to database format
function transformToDb(form: CounsellingFormData) {
  const date = new Date(form.preferredDate as string);

  const isoDate = isNaN(date.getTime())
    ? form.preferredDate
    : date.toISOString().split('T')[0];

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
    parent_contact_number:
      form.parentContactNumber ?? null,
    guardian_consent: form.guardianConsent,
    terms_accepted: form.termsAccepted
  };
}

// Submit counselling registration
export async function submitCounsellingRegistration(
  formData: CounsellingFormData
): Promise<{
  success: boolean;
  id: string;
  error?: string;
}> {
  try {
    const payload = transformToDb(formData);

    const { error } = await supabase
      .from('counselling_leads')
      .insert(payload);

    if (error) {
      console.error('Registration error:', error.message);

      return {
        success: false,
        id: '',
        error: 'Registration failed. Please try again.'
      };
    }

    return {
      success: true,
      id: ''
    };

  } catch (error) {
    console.error('Registration failed:', error);

    return {
      success: false,
      id: '',
      error: 'Registration failed. Please try again.'
    };
  }
}

// Safely parse array fields
function parseArray(value: any) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];

  } catch {
    return [];
  }
}

// Safely parse paid enrolment objects
function parsePaidEnrolments(
  value: unknown
): CounsellingLead['paidEnrolments'] {
  if (!value) {
    return undefined;
  }

  try {
    const parsed =
      typeof value === 'string'
        ? JSON.parse(value)
        : value;

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return parsed as CounsellingLead['paidEnrolments'];
    }

    return undefined;

  } catch {
    return undefined;
  }
}

// Fetch registrations for authorized administrators
export async function fetchAllLeads():
  Promise<CounsellingLead[]> {

  const admin = await getCurrentAdminUser();

  if (!admin) {
    throw new Error('Unauthorized access.');
  }

  const { data, error } = await supabase
    .from('counselling_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(
      'Unable to fetch leads:',
      error.message
    );

    throw new Error('Unable to load registrations.');
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    fullName: row.full_name,
    mobileNumber: row.mobile_number,
    email: row.email,
    academicStatus: row.academic_status,

    subjects: parseArray(row.subjects),

    preparationRating: row.preparation_rating,
    mockScore: row.mock_score,
    hasAttemptedMock: row.has_attempted_mock,

    challenges: parseArray(row.challenges),

    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,

    parentContactNumber:
      row.parent_contact_number ?? undefined,

    guardianConsent: row.guardian_consent,
    termsAccepted: row.terms_accepted,
    createdAt: row.created_at,

    status: row.status as LeadStatus,

    internalNotes:
      row.internal_notes ?? undefined,

    assignedCounsellor:
      row.assigned_counsellor ?? undefined,

    paidEnrolments:
      parsePaidEnrolments(row.paid_enrolments)
  }));
}

// Update registration details
// Only for authenticated administrators
export async function updateLeadDetails(
  leadId: string,
  updates: Partial<
    Pick<
      CounsellingLead,
      | 'status'
      | 'internalNotes'
      | 'assignedCounsellor'
      | 'paidEnrolments'
    >
  >
): Promise<boolean> {

  try {
    const admin = await getCurrentAdminUser();

    if (!admin) {
      return false;
    }

    const payload: Record<string, unknown> = {};

    if (updates.status !== undefined) {
      payload.status = updates.status;
    }

    if (updates.internalNotes !== undefined) {
      payload.internal_notes =
        updates.internalNotes;
    }

    if (updates.assignedCounsellor !== undefined) {
      payload.assigned_counsellor =
        updates.assignedCounsellor;
    }

    if (updates.paidEnrolments !== undefined) {
      payload.paid_enrolments =
        JSON.stringify(updates.paidEnrolments);
    }

    if (Object.keys(payload).length === 0) {
      return false;
    }

    const { data, error } = await supabase
      .from('counselling_leads')
      .update(payload)
      .eq('id', leadId)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(
        'Update failed:',
        error.message
      );

      return false;
    }

    return Boolean(data);

  } catch (error) {
    console.error('Update failed:', error);

    return false;
  }
}