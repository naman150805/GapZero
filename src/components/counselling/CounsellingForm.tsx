import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, ShieldCheck, Sparkles, PhoneCall, Calendar } from 'lucide-react';
import { CounsellingFormData, SubjectChoice, AcademicStatus, PreferredTime, PreparationChallenge, PreferredCounsellingDate } from '../../types/counselling';
import { isValidIndianMobile, isValidEmail, isValidMockScore } from '../../utils/validation';
import { submitCounsellingRegistration } from '../../services/counsellingService';
import { BUSINESS_CONFIG } from '../../config/business';

export const CounsellingForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Initial subject selection from URL query param (?subject=physics)
  const initialSubjectParam = searchParams.get('subject')?.toLowerCase();
  let defaultSubjects: SubjectChoice[] = [];
  if (initialSubjectParam === 'physics') defaultSubjects = ['Physics'];
  else if (initialSubjectParam === 'chemistry') defaultSubjects = ['Chemistry'];
  else if (initialSubjectParam === 'mathematics') defaultSubjects = ['Mathematics'];

  // Allowed counselling dates
  const availableDates: { date: PreferredCounsellingDate; dayOfWeek: string; shortMonth: string; dayNum: string }[] = [
    { date: '27 November 2026', dayOfWeek: 'Friday', shortMonth: 'Nov', dayNum: '27' },
    { date: '28 November 2026', dayOfWeek: 'Saturday', shortMonth: 'Nov', dayNum: '28' },
    { date: '29 November 2026', dayOfWeek: 'Sunday', shortMonth: 'Nov', dayNum: '29' },
    { date: '30 November 2026', dayOfWeek: 'Monday', shortMonth: 'Nov', dayNum: '30' },
    { date: '1 December 2026', dayOfWeek: 'Tuesday', shortMonth: 'Dec', dayNum: '01' },
  ];

  const [formData, setFormData] = useState<CounsellingFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    academicStatus: 'Class 12',
    subjects: defaultSubjects.length > 0 ? defaultSubjects : ['Physics', 'Chemistry', 'Mathematics'],
    preparationRating: 5,
    mockScore: '',
    hasAttemptedMock: true,
    challenges: ['Conceptual understanding', 'Problem-solving'],
    preferredDate: '',
    preferredTime: 'Evening',
    parentContactNumber: '',
    guardianConsent: true,
    termsAccepted: true,
    utmSource: searchParams.get('utm_source') || undefined,
    utmMedium: searchParams.get('utm_medium') || undefined,
    utmCampaign: searchParams.get('utm_campaign') || undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[fieldName];
        return copy;
      });
    }
  };

  // Sync if query param changes
  useEffect(() => {
    const sParam = searchParams.get('subject')?.toLowerCase();
    if (sParam === 'physics') setFormData(prev => ({ ...prev, subjects: ['Physics'] }));
    else if (sParam === 'chemistry') setFormData(prev => ({ ...prev, subjects: ['Chemistry'] }));
    else if (sParam === 'mathematics') setFormData(prev => ({ ...prev, subjects: ['Mathematics'] }));
  }, [searchParams]);

  // Handle multi-select for subjects
  const toggleSubject = (sub: SubjectChoice) => {
    setFormData(prev => {
      const exists = prev.subjects.includes(sub);
      const next = exists ? prev.subjects.filter(s => s !== sub) : [...prev.subjects, sub];
      return { ...prev, subjects: next };
    });
    clearFieldError('subjects');
  };

  // Handle multi-select for challenges
  const challengeOptions: PreparationChallenge[] = [
    'Conceptual understanding',
    'Problem-solving',
    'Incomplete syllabus',
    'Low mock test scores',
    'Time management',
    'Lack of consistency',
    'Doubt solving',
    'Other'
  ];

  const toggleChallenge = (item: PreparationChallenge) => {
    setFormData(prev => {
      const exists = prev.challenges.includes(item);
      const next = exists ? prev.challenges.filter(c => c !== item) : [...prev.challenges, item];
      return { ...prev, challenges: next };
    });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your complete name.';
    }

    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required.';
    } else if (!isValidIndianMobile(formData.mobileNumber)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (formData.subjects.length === 0) {
      errs.subjects = 'Please select at least one subject you need help with.';
    }

    const mockCheck = isValidMockScore(formData.mockScore, formData.hasAttemptedMock);
    if (!mockCheck.isValid) {
      errs.mockScore = mockCheck.error || 'Invalid mock score.';
    }

    // Required Preferred Counselling Date
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select your preferred counselling date.';
    }

    if (formData.parentContactNumber && formData.parentContactNumber.trim()) {
      if (!isValidIndianMobile(formData.parentContactNumber)) {
        errs.parentContactNumber = 'Parent contact must be a valid 10-digit Indian mobile number.';
      }
    }

    if (!formData.guardianConsent) {
      errs.guardianConsent = 'Please confirm guardian consent / student declaration.';
    }

    if (!formData.termsAccepted) {
      errs.termsAccepted = 'Please accept the privacy policy to continue.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstErrorElement = document.querySelector('.error-message');
      firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitCounsellingRegistration(formData);
      if (result.success) {
        setIsSubmitted(true);
        setSubmissionId(result.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err: unknown) {
      setSubmitError((err as Error).message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Registration Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] pt-2">
            Thank you for registering with GapZero!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            Our team will contact you to coordinate your free personalized counselling session with an IIT Delhi student.
          </p>
        </div>

        {/* Details Box */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 text-left text-xs sm:text-sm space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Student Name:</span>
            <span className="font-bold text-slate-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Mobile Number:</span>
            <span className="font-bold text-slate-900">{formData.mobileNumber}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Selected Subjects:</span>
            <span className="font-bold text-[#2563EB]">{formData.subjects.join(', ')}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Preferred Date:</span>
            <span className="font-bold text-[#2563EB]">{formData.preferredDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Preferred Slot:</span>
            <span className="font-bold text-slate-900">{formData.preferredTime}</span>
          </div>
          {submissionId && (
            <div className="text-[11px] text-slate-400 pt-2 text-right">
              Ref ID: <span className="font-mono">{submissionId}</span>
            </div>
          )}
        </div>

        {/* Assistance Information */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-slate-700 space-y-1">
          <p className="font-semibold text-slate-900">
            Need urgent assistance or have questions right now?
          </p>
          <p className="text-slate-600">
            For assistance, contact us at{' '}
            <a href={`tel:${BUSINESS_CONFIG.phoneClean}`} className="font-bold text-[#2563EB] hover:underline">
              {BUSINESS_CONFIG.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="font-bold text-[#2563EB] hover:underline">
              {BUSINESS_CONFIG.email}
            </a>
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={`https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=${encodeURIComponent(`Hello GapZero, I just submitted counselling registration for ${formData.fullName} (Ref: ${submissionId}) for ${formData.preferredDate} (${formData.preferredTime}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-emerald-600 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>WhatsApp Us Now</span>
          </a>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8"
    >
      {/* Global Form Error Message */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Submission Failed</p>
            <p className="text-xs">{submitError}</p>
          </div>
        </div>
      )}

      {/* Section 1: Personal Details */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-extrabold">1</span>
          <span>Student Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                clearFieldError('fullName');
              }}
              placeholder="e.g. Aarav Sharma"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.fullName ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-300 focus:ring-blue-200 focus:border-[#2563EB]'
              }`}
            />
            {errors.fullName && (
              <p className="error-message text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mobile Number (WhatsApp) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={formData.mobileNumber}
                onChange={(e) => {
                  setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') });
                  clearFieldError('mobileNumber');
                }}
                placeholder="9876543210"
                className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.mobileNumber ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-300 focus:ring-blue-200 focus:border-[#2563EB]'
                }`}
              />
            </div>
            {errors.mobileNumber && (
              <p className="error-message text-xs text-red-600 mt-1 font-medium">{errors.mobileNumber}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                clearFieldError('email');
              }}
              placeholder="e.g. student@gmail.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.email ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-300 focus:ring-blue-200 focus:border-[#2563EB]'
              }`}
            />
            {errors.email && (
              <p className="error-message text-xs text-red-600 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Parent Contact Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Parent's Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={formData.parentContactNumber || ''}
                onChange={(e) => setFormData({ ...formData, parentContactNumber: e.target.value.replace(/\D/g, '') })}
                placeholder="Parent's 10-digit number"
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2563EB] transition"
              />
            </div>
            {errors.parentContactNumber && (
              <p className="error-message text-xs text-red-600 mt-1 font-medium">{errors.parentContactNumber}</p>
            )}
          </div>

        </div>
      </div>

      {/* Section 2: Academic Status & Subject Selection */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-extrabold">2</span>
          <span>Academic Background &amp; Subject Selection</span>
        </h3>

        {/* Current Academic Status */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Current Academic Status <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Class 12', 'JEE Dropper', 'Other'] as AcademicStatus[]).map((status) => (
              <button
                type="button"
                key={status}
                onClick={() => setFormData({ ...formData, academicStatus: status })}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                  formData.academicStatus === status
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Multi-Select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Which subjects do you need help with? <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal lowercase ml-1">(select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['Physics', 'Chemistry', 'Mathematics'] as SubjectChoice[]).map((sub) => {
              const selected = formData.subjects.includes(sub);
              return (
                <button
                  type="button"
                  key={sub}
                  onClick={() => toggleSubject(sub)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                    selected
                      ? 'border-[#2563EB] bg-blue-50/80 text-[#2563EB] font-bold shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span className="text-sm">{sub}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      selected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-slate-300'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.subjects && (
            <p className="error-message text-xs text-red-600 mt-1 font-medium">{errors.subjects}</p>
          )}
        </div>
      </div>

      {/* Section 3: Academic Self-Assessment */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-extrabold">3</span>
          <span>Preparation Level Diagnosis</span>
        </h3>

        {/* Interactive Preparation Scale (1 to 10) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Rate your current JEE preparation on a scale of 1 to 10 <span className="text-red-500">*</span>
            </label>
            <span className="text-xs font-extrabold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Rating: {formData.preparationRating}/10
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setFormData({ ...formData, preparationRating: num })}
                className={`py-2 rounded-lg text-xs font-bold transition ${
                  formData.preparationRating === num
                    ? 'bg-[#2563EB] text-white shadow-md scale-105 ring-2 ring-blue-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 px-1">
            <span>1 = Not prepared at all</span>
            <span>10 = Fully confident</span>
          </div>
        </div>

        {/* Recent Mock Test Score */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Most recent JEE mock test score out of 300 <span className="text-red-500">*</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={!formData.hasAttemptedMock}
                onChange={(e) => {
                  const notAttempted = e.target.checked;
                  setFormData({
                    ...formData,
                    hasAttemptedMock: !notAttempted,
                    mockScore: notAttempted ? 'Not attempted' : ''
                  });
                }}
                className="w-4 h-4 rounded text-[#2563EB] focus:ring-blue-400"
              />
              <span>I have not attempted a full mock test yet</span>
            </label>
          </div>

          {formData.hasAttemptedMock ? (
            <div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.mockScore}
                  onChange={(e) => {
                    setFormData({ ...formData, mockScore: e.target.value });
                    clearFieldError('mockScore');
                  }}
                  placeholder="e.g. 145 or -5 (valid negative scores supported)"
                  className={`w-full sm:w-64 px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition ${
                    errors.mockScore ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-300 focus:ring-blue-200 focus:border-[#2563EB]'
                  }`}
                />
                <span className="text-xs font-semibold text-slate-500">/ 300 Marks</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Enter your total score. Valid negative marks (down to -75) are supported.
              </p>
              {errors.mockScore && (
                <p className="error-message text-xs text-red-600 mt-1 font-medium">{errors.mockScore}</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Mock test status marked as &quot;Not attempted yet&quot;. Your counsellor will help benchmark your starting level.
            </p>
          )}
        </div>

        {/* Biggest Preparation Challenges */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            What is your biggest preparation challenge? <span className="text-slate-400 font-normal lowercase">(select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {challengeOptions.map((opt) => {
              const isChecked = formData.challenges.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleChallenge(opt)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${
                    isChecked
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate pr-1">{opt}</span>
                  <div className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center ${isChecked ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-slate-300'}`}>
                    {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-xs" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Section 4: Date & Time Slot Selection */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-extrabold">4</span>
          <span>Select Your Free Counselling Slot</span>
        </h3>

        {/* Preferred Counselling Date (New Field - Required) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Preferred Counselling Date <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Available slots for 45-day launch</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {availableDates.map((item) => {
              const isSelected = formData.preferredDate === item.date;
              return (
                <button
                  type="button"
                  key={item.date}
                  onClick={() => {
                    setFormData({ ...formData, preferredDate: item.date });
                    clearFieldError('preferredDate');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center group ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/90 text-[#2563EB] shadow-md ring-2 ring-[#2563EB]/30 -translate-y-0.5'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-1 ${
                    isSelected ? 'text-[#2563EB]' : 'text-slate-400'
                  }`}>
                    {item.dayOfWeek}
                  </span>
                  <span className={`text-2xl font-extrabold block leading-tight ${
                    isSelected ? 'text-[#0F172A]' : 'text-slate-900'
                  }`}>
                    {item.dayNum}
                  </span>
                  <span className={`text-xs font-bold block mt-0.5 ${
                    isSelected ? 'text-[#2563EB]' : 'text-slate-500'
                  }`}>
                    {item.shortMonth} 2026
                  </span>
                </button>
              );
            })}
          </div>
          {errors.preferredDate && (
            <p className="error-message text-xs text-red-600 mt-1.5 font-medium">{errors.preferredDate}</p>
          )}
        </div>

        {/* Preferred Counselling Time */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Preferred Counselling Time <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(['Morning', 'Afternoon', 'Evening'] as PreferredTime[]).map((time) => {
              const isSelected = formData.preferredTime === time;
              const slotHours = time === 'Morning' ? '10 AM – 1 PM' : time === 'Afternoon' ? '2 PM – 5 PM' : '6 PM – 9 PM';
              return (
                <button
                  type="button"
                  key={time}
                  onClick={() => setFormData({ ...formData, preferredTime: time })}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition text-center ${
                    isSelected
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="block font-bold">{time}</span>
                  <span className={`block text-[10px] font-normal mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {slotHours}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Consent & Privacy */}
      <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
        
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.guardianConsent}
            onChange={(e) => setFormData({ ...formData, guardianConsent: e.target.checked })}
            className="w-4 h-4 rounded text-[#2563EB] mt-0.5"
          />
          <span className="leading-snug">
            I confirm that I am a student or parent/guardian registering for educational counselling. If the student is a minor, parent or guardian consent is acknowledged.
          </span>
        </label>
        {errors.guardianConsent && (
          <p className="error-message text-xs text-red-600 font-medium">{errors.guardianConsent}</p>
        )}

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            className="w-4 h-4 rounded text-[#2563EB] mt-0.5"
          />
          <span className="leading-snug">
            I agree to be contacted via WhatsApp/Phone/Email by GapZero regarding my counselling session and agree to the{' '}
            <Link to="/privacy-policy" target="_blank" className="text-[#2563EB] underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="error-message text-xs text-red-600 font-medium">{errors.termsAccepted}</p>
        )}

      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Registering Your Free Session...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Register for Free Counselling</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Free • No Payment Required • IIT Delhi Peer Counselling</span>
        </p>
      </div>

    </form>
  );
};
