export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });

    if (!response.ok) {
      const message = await response.text();
      return { error: message || "Request failed" };
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export const api = {
  getComplaints: () => apiFetch("/complaints"),
  getLeaderboard: () => apiFetch("/leaderboard"),
  raiseComplaint: (payload: Record<string, unknown>) =>
    apiFetch("/complaints", { method: "POST", body: JSON.stringify(payload) }),
};