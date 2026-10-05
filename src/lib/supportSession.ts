import type { StoredSupportSession, TrackingSupportCreateResponse } from '@/types';

const LEGACY_STORAGE_KEY = 'myflightlookup.support-session.v1';
const STORAGE_KEY = 'myflightlookup.support-sessions.v2';
export const SUPPORT_SESSION_EVENT = 'myflightlookup:support-session';

type SupportSessionStore = {
  sessions: StoredSupportSession[];
  activeId: string | null;
};

const EMPTY_STORE: SupportSessionStore = { sessions: [], activeId: null };

function readStore(): SupportSessionStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const value = JSON.parse(stored) as SupportSessionStore;
      if (Array.isArray(value.sessions)) return value;
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const session = JSON.parse(legacy) as StoredSupportSession;
      const migrated = { sessions: [session], activeId: session.id };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrated;
    }
  } catch {
    // Treat damaged browser storage as an empty inbox.
  }
  return EMPTY_STORE;
}

function writeStore(store: SupportSessionStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function loadSupportSessions() {
  return readStore().sessions;
}

export function loadSupportSession(): StoredSupportSession | null {
  const store = readStore();
  return store.sessions.find((session) => session.id === store.activeId) ?? store.sessions[0] ?? null;
}

export function activateSupportSession(id: string) {
  const store = readStore();
  const session = store.sessions.find((item) => item.id === id) ?? null;
  if (session) writeStore({ ...store, activeId: id });
  return session;
}

export function rememberSupportSession(response: TrackingSupportCreateResponse, trackingId?: string) {
  const session: StoredSupportSession = {
    id: response.id,
    accessToken: response.access_token,
    channel: response.channel,
    realtime: response.realtime,
    trackingId,
    createdAt: new Date().toISOString(),
  };
  const store = readStore();
  writeStore({
    sessions: [session, ...store.sessions.filter((item) => item.id !== session.id)],
    activeId: session.id,
  });
  window.dispatchEvent(new CustomEvent(SUPPORT_SESSION_EVENT, { detail: session }));
  return session;
}

export function refreshSupportSession(session: StoredSupportSession) {
  const store = readStore();
  writeStore({
    sessions: store.sessions.map((item) => item.id === session.id ? session : item),
    activeId: session.id,
  });
  return session;
}

export function forgetSupportSession(id: string) {
  const store = readStore();
  const sessions = store.sessions.filter((session) => session.id !== id);
  writeStore({ sessions, activeId: sessions[0]?.id ?? null });
  return sessions;
}
