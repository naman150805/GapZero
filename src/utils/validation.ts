/**
 * Validates Indian 10-digit mobile number format
 * Valid numbers start with 6, 7, 8, or 9
 */
export function isValidIndianMobile(mobile: string): boolean {
  const cleanMobile = mobile.replace(/\D/g, '');
  // Allow 10 digits or 12 digits if starts with 91, or 11 digits if starts with 0
  if (cleanMobile.length === 10) {
    return /^[6-9]\d{9}$/.test(cleanMobile);
  }
  if (cleanMobile.length === 12 && cleanMobile.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(cleanMobile.substring(2));
  }
  if (cleanMobile.length === 11 && cleanMobile.startsWith('0')) {
    return /^[6-9]\d{9}$/.test(cleanMobile.substring(1));
  }
  return false;
}

/**
 * Standard Email format validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates Mock Score: Supports valid negative mock scores down to -75 up to +300
 */
export function isValidMockScore(scoreStr: string, hasAttempted: boolean): { isValid: boolean; error?: string } {
  if (!hasAttempted) {
    return { isValid: true };
  }
  const trimmed = scoreStr.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your mock test score or select "Not attempted yet"' };
  }
  const scoreNum = Number(trimmed);
  if (isNaN(scoreNum)) {
    return { isValid: false, error: 'Please enter a valid number for mock score' };
  }
  // JEE Main has 75 questions, max score 300, min negative score -75
  if (scoreNum < -75 || scoreNum > 300) {
    return { isValid: false, error: 'Mock test score must be between -75 and 300' };
  }
  return { isValid: true };
}
