export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
  status: string;
}

export interface AdminStats {
  total: number;
  unread: number;
  today: number;
  thisWeek: number;
}

const API_BASE = '/api';

export async function submitContactMessage(
  name: string,
  email: string,
  message: string,
  honeypot: string = ''
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, message, honeypot }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Something went wrong. Please try again.',
      };
    }

    return {
      success: true,
      message: data.message || "Message sent successfully. I'll get back to you soon.",
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}

export async function adminSignIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Invalid credentials.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Authentication request failed.',
    };
  }
}

export async function adminSignOut(): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // Ignore error on logout
  }
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) return false;
    const data = await response.json();
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

export async function fetchAdminMessages(
  search?: string,
  filter?: 'ALL' | 'UNREAD' | 'READ'
): Promise<ContactMessage[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (filter && filter !== 'ALL') params.append('filter', filter);

  const url = `${API_BASE}/admin/messages${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch messages: ${response.statusText}`);
  }

  const data = await response.json();
  return (data.messages as ContactMessage[]) || [];
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${API_BASE}/admin/stats`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch admin stats');
  }

  const data = await response.json();
  return data.stats;
}

export async function toggleMessageReadStatus(id: string, read: boolean): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ read }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function deleteMessageRecord(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    return response.ok;
  } catch {
    return false;
  }
}
