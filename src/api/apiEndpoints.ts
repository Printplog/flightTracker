import type { PurchasedTemplate, TrackingSupportPayload } from "@/types";
import { apiClient } from "./apiClient";

export const trackOrder = async (id: string): Promise<PurchasedTemplate> => {
  const res = await apiClient.get(`/track/${id}/`);
  return res.data;
};

export const submitTrackingSupport = async (payload: TrackingSupportPayload): Promise<{ id: string; message: string }> => {
  const res = await apiClient.post('/tracking-support/', payload);
  return res.data;
};
