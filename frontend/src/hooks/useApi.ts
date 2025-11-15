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

    const response = await fetch(`http://localhost:3000${endpoint}`, {
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

  return apiCall;
};
