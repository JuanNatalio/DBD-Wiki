import { useAuth0 } from "@auth0/auth0-react";
import config from "../config";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const apiCall = async <T = unknown>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: config.auth0_audience,
      },
    });

    const apiBaseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: response.statusText,
      }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  };

  const post = <T = unknown>(endpoint: string, body: unknown) =>
    apiCall<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });

  const get = <T = unknown>(endpoint: string) => apiCall<T>(endpoint);

  const del = <T = unknown>(endpoint: string) =>
    apiCall<T>(endpoint, {
      method: "DELETE",
    });

  return { apiCall, get, post, del };
};
