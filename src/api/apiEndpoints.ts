import type { PurchasedTemplate } from "@/types";
import { apiClient } from "./apiClient";

export const trackOrder = async (id: string): Promise<PurchasedTemplate> => {
  const res = await apiClient.get(`/track/${id}/`);
  return res.data;
}