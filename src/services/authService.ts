import { signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';

const ADMIN_STORAGE_KEY = 'gapzero_admin_session';

export interface AdminUser {
  email: string;
  role: 'admin';
  name: string;
}

// Default secure master credentials for local admin preview/management
export const DEMO_ADMIN_CREDENTIALS = {
  email: 'admin@gapzero.in',
  password: 'GapZeroAdmin2026!'
};

/**
 * Sign in admin user
 */
export async function signInAdmin(email: string, pass: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  // Try Firebase Auth if configured
  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const adminUser: AdminUser = {
        email: userCredential.user.email || email,
        role: 'admin',
        name: 'GapZero Administrator'
      };
      sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    } catch (err: unknown) {
      const fbError = err as { code?: string; message?: string };
      // If user not found in firebase or invalid creds
      if (fbError.code === 'auth/user-not-found' || fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
        return { success: false, error: 'Invalid administrator email or password.' };
      }
      console.warn('Firebase auth attempt returned:', fbError.message);
    }
  }

  // Admin authentication validation
  if (email.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.email.toLowerCase() && pass === DEMO_ADMIN_CREDENTIALS.password) {
    const adminUser: AdminUser = {
      email: DEMO_ADMIN_CREDENTIALS.email,
      role: 'admin',
      name: 'GapZero Administrator'
    };
    sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    return { success: true, user: adminUser };
  }

  return { success: false, error: 'Invalid administrator email or password.' };
}

/**
 * Sign out admin user
 */
export async function signOutAdmin(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.error('Firebase signout error:', e);
    }
  }
  sessionStorage.removeItem(ADMIN_STORAGE_KEY);
}

/**
 * Get current admin session
 */
export function getCurrentAdminUser(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
