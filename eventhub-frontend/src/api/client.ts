const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api").replace(/\/$/, "");
export const apiAssetUrl = (asset: string) => /^https?:\/\//i.test(asset) ? asset : new URL(asset, new URL(API_BASE_URL).origin).toString();

export type ApiFailure = Error & { status?: number; details?: unknown };
type Envelope<T> = { success: boolean; data: T; message?: string; errors?: unknown };

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(API_BASE_URL + (path.startsWith("/") ? path : "/" + path), {
    ...init, headers, credentials: "include",
  });
  const body = response.status === 204 ? null : await response.json().catch(() => null) as Envelope<T> | null;
  if (!response.ok || (body && !body.success)) {
    const details = body?.errors as { fieldErrors?: Record<string, string[]> } | undefined;
    const validationMessages = Object.entries(details?.fieldErrors || {}).flatMap(([field, messages]) => messages.map((message) => `${field}: ${message}`));
    const message = body?.message === "Request data is invalid." && validationMessages.length
      ? validationMessages.join(" ")
      : body?.message || "Request failed (" + response.status + ").";
    const error = new Error(message) as ApiFailure;
    error.status = response.status;
    error.details = body?.errors;
    throw error;
  }
  return (body?.data ?? null) as T;
}
const json = (method: string, body?: unknown): RequestInit => ({ method, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, json("POST", body)),
  upload: <T>(path: string, body: FormData) => request<T>(path, { method: "POST", body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, json("PATCH", body)),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
export type Page<T> = { items: T[]; pagination?: { page: number; pageSize: number; total: number; pages: number } };
export type User = { id: number; name: string; email: string; role: "buyer" | "seller" | "admin"; buyerProfile?: { phone?: string | null; avatarUrl?: string | null } | null; sellerProfile?: { businessName?: string | null; location?: string | null; isVerified?: boolean } | null };
export type Listing = { id: number; sellerId: number; title: string; description: string; location: string | null; price: string | number; currency: string; status: string; category: { id: number; name: string; slug: string }; images: { id: number; url: string; altText?: string | null }[]; seller: { id: number; name: string; sellerProfile?: { businessName?: string | null; location?: string | null; isVerified?: boolean } | null } };
export type EventRecord = { id: number; name: string; category: string; eventDate: string; eventTime: string; location: string; guests: number; budget: string | number; description: string | null; services: string[]; status: string };
export type Booking = { id: number; buyerId: number; sellerId: number; listingId: number | null; eventDate: string | null; amount: string | number; currency: string; status: string; listing?: { id: number; title: string; location: string | null } | null; buyer?: { id: number; name: string }; seller?: { id: number; name: string; sellerProfile?: { businessName?: string | null } | null } };
export type ServiceRequest = { id: number; buyerId: number; sellerId: number | null; listing?: { id: number; title: string } | null; title: string; eventDate: string | null; location: string | null; minBudget: string | number | null; maxBudget: string | number | null; details: string; status: string; buyer?: { id: number; name: string }; offers?: Offer[] };
export type Offer = { id: number; requestId: number; sellerId: number; amount: string | number; currency: string; description: string; status: string; seller?: { name: string } };
export const authApi = {
  me: () => api.get<User>("/auth/me"),
  login: (email: string, password: string) => api.post<User>("/auth/login", { email, password }),
  register: (input: { name: string; email: string; password: string; role: "buyer" | "seller" }) => api.post<User>("/auth/register", input),
  logout: () => api.post<null>("/auth/logout"),
};
export const listingApi = {
  list: (params: Record<string, string | number | undefined> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") query.set(key, String(value)); });
    return api.get<Page<Listing>>("/listings" + (query.size ? "?" + query : ""));
  },
  get: (id: number) => api.get<Listing>("/listings/" + id),
  create: (input: unknown) => api.post<Listing>("/listings", input),
  update: (id: number, input: unknown) => api.patch<Listing>("/listings/" + id, input),
  archive: (id: number) => api.delete("/listings/" + id),
};
export const eventApi = {
  list: () => api.get<Page<EventRecord>>("/events"),
  create: (input: unknown) => api.post<EventRecord>("/events", input),
  update: (id: number, input: unknown) => api.patch<EventRecord>("/events/" + id, input),
  delete: (id: number) => api.delete("/events/" + id),
};
export const requestApi = {
  list: () => api.get<Page<ServiceRequest>>("/requests"),
  create: (input: unknown) => api.post<ServiceRequest>("/requests", input),
  offer: (id: number, input: unknown) => api.post<Offer>("/requests/" + id + "/offers", input),
  decline: (id: number) => api.post("/requests/" + id + "/decline"),
  acceptOffer: (id: number) => api.post<Booking>("/offers/" + id + "/accept"),
  declineOffer: (id: number) => api.post("/offers/" + id + "/decline"),
};
export const bookingApi = {
  list: () => api.get<Page<Booking>>("/bookings"),
  get: (id: number) => api.get<Booking>("/bookings/" + id),
  create: (input: unknown) => api.post<Booking>("/bookings", input),
  updateStatus: (id: number, status: string, note?: string) => api.patch<Booking>("/bookings/" + id + "/status", { status, note }),
};
export const paymentApi = { request: (bookingId: number) => api.post("/payments", { bookingId, idempotencyKey: crypto.randomUUID() }) };
export const sellerApi = {
  profile: () => api.get<Record<string, unknown>>("/seller/profile"),
  updateProfile: (input: unknown) => api.patch("/seller/profile", input),
  stats: () => api.get<Record<string, number>>("/seller/stats"),
  verification: () => api.get<unknown[]>("/verification"),
  submitVerification: (input: unknown) => api.post("/verification", input),
};
export const userApi = {
  profile: () => api.get<User>("/users/me"),
  updateProfile: (input: unknown) => api.patch<User>("/users/me", input),
};
export const reviewApi = {
  list: (sellerId?: number) => api.get<Page<Record<string, unknown>>>("/reviews" + (sellerId ? "?sellerId=" + sellerId : "")),
  create: (input: unknown) => api.post("/reviews", input),
};
export const messageApi = {
  conversations: () => api.get<Page<Record<string, any>>>("/messages"),
  messages: (id: number) => api.get<Page<Record<string, any>>>("/messages?conversationId=" + id),
  send: (recipientId: number, body: string) => api.post("/messages", { recipientId, body }),
};
export const categoryApi = { list: () => api.get<Array<{ id: number; name: string; slug: string }>>("/categories") };
