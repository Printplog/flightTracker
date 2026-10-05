import type {
  PurchasedTemplate,
  StoredSupportSession,
  SupportConversationEntry,
  TrackingSupportCreateResponse,
  TrackingSupportPayload,
  TrackingSupportThread,
} from "@/types";
import { apiClient } from "./apiClient";

export const trackOrder = async (id: string): Promise<PurchasedTemplate> => {
  const res = await apiClient.get(`/track/${id}/`);
  return res.data;
};

export const submitTrackingSupport = async (payload: TrackingSupportPayload): Promise<TrackingSupportCreateResponse> => {
  const res = await apiClient.post('/tracking-support/', payload);
  return res.data;
};

const supportHeaders = (session: StoredSupportSession) => ({
  'X-Support-Token': session.accessToken,
});

export const getTrackingSupportThread = async (session: StoredSupportSession): Promise<TrackingSupportThread> => {
  const res = await apiClient.get(`/tracking-support/${session.id}/`, { headers: supportHeaders(session) });
  return res.data;
};

export const sendTrackingSupportMessage = async (
  session: StoredSupportSession,
  body: string,
): Promise<SupportConversationEntry> => {
  const res = await apiClient.post(
    `/tracking-support/${session.id}/replies/`,
    { body },
    { headers: supportHeaders(session) },
  );
  return res.data;
};

export const authorizeTrackingSupportRealtime = async (
  session: StoredSupportSession,
  socketId: string,
  channelName: string,
): Promise<{ auth: string }> => {
  const res = await apiClient.post(
    `/tracking-support/${session.id}/realtime-auth/`,
    { socket_id: socketId, channel_name: channelName },
    { headers: supportHeaders(session) },
  );
  return res.data;
};
