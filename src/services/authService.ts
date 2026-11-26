import { supabase } from '../config/supabase';

const ADMIN_UID = '9f30a653-faac-45a7-863e-32f3c94d8173';

export interface AdminUser {
  email: string;
  role: 'admin';
  name: string;
}

export async function signInAdmin(
  email: string,
  pass: string
): Promise<{
  success: boolean;
  user?: AdminUser;
  error?: string;
}> {
  try {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass
      });

    if (error || !data.user) {
      return {
        success: false,
        error: 'Invalid administrator email or password.'
      };
    }

    if (data.user.id !== ADMIN_UID) {
      await supabase.auth.signOut({ scope: 'local' });

      return {
        success: false,
        error: 'Unauthorized access.'
      };
    }

    return {
      success: true,
      user: {
        email: data.user.email || email,
        role: 'admin',
        name: 'GapZero Administrator'
      }
    };
  } catch {
    return {
      success: false,
      error: 'Authentication failed. Please try again.'
    };
  }
}

export async function signOutAdmin(): Promise<void> {
  sessionStorage.removeItem('gapzero_admin_session');

  await supabase.auth.signOut({ scope: 'local' });
}

export async function getCurrentAdminUser():
  Promise<AdminUser | null> {
  try {
    const { data, error } =
      await supabase.auth.getUser();

    if (
      error ||
      !data.user ||
      data.user.id !== ADMIN_UID
    ) {
      return null;
    }

    return {
      email: data.user.email || '',
      role: 'admin',
      name: 'GapZero Administrator'
    };
  } catch {
    return null;
  }
}