import type { StoredSupportSession, TrackingSupportCreateResponse } from '@/types';

const STORAGE_KEY = 'myflightlookup.support-session.v1';
export const SUPPORT_SESSION_EVENT = 'myflightlookup:support-session';

export function loadSupportSession(): StoredSupportSession | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as StoredSupportSession : null;
  } catch {
    return null;
  }
}

export function rememberSupportSession(response: TrackingSupportCreateResponse) {
  const session: StoredSupportSession = {
    id: response.id,
    accessToken: response.access_token,
    channel: response.channel,
    realtime: response.realtime,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(SUPPORT_SESSION_EVENT, { detail: session }));
  return session;
}

export function refreshSupportSession(session: StoredSupportSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function forgetSupportSession() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SUPPORT_SESSION_EVENT, { detail: null }));
}
