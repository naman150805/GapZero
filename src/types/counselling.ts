export type AcademicStatus = 'Class 12' | 'JEE Dropper' | 'Other';

export type SubjectChoice = 'Physics' | 'Chemistry' | 'Mathematics';

export type PreferredTime = 'Morning' | 'Afternoon' | 'Evening';

export type PreferredCounsellingDate =
  | '27 November 2026'
  | '28 November 2026'
  | '29 November 2026'
  | '30 November 2026'
  | '1 December 2026';

export type PreparationChallenge =
  | 'Conceptual understanding'
  | 'Problem-solving'
  | 'Incomplete syllabus'
  | 'Low mock test scores'
  | 'Time management'
  | 'Lack of consistency'
  | 'Doubt solving'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Counselling Scheduled'
  | 'Counselling Completed'
  | 'Converted'
  | 'Not Converted';

export interface CounsellingFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  academicStatus: AcademicStatus;
  subjects: SubjectChoice[];
  preparationRating: number; // 1 to 10
  mockScore: string; // score string (e.g., "-10", "145", or "Not attempted")
  hasAttemptedMock: boolean;
  challenges: PreparationChallenge[];
  preferredDate: PreferredCounsellingDate | string;
  preferredTime: PreferredTime;
  parentContactNumber?: string;
  guardianConsent: boolean;
  termsAccepted: boolean;
  // UTM & Analytics
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface CounsellingLead extends CounsellingFormData {
  id: string;
  createdAt: string; // ISO string
  status: LeadStatus;
  internalNotes?: string;
  assignedCounsellor?: string;
  paidEnrolments?: {
    physics?: boolean;
    chemistry?: boolean;
    mathematics?: boolean;
    enrolledAt?: string;
  };
}
