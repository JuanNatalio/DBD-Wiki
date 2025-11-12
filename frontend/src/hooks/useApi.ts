import { useAuth0 } from "@auth0/auth0-react";
import config from "../config";

/**
 * Custom hook for making authenticated API calls
 *
 * This hook provides a function that:
 * 1. Gets the JWT token from Auth0
 * 2. Makes a fetch request with the token in the Authorization header
 * 3. Returns the response data
 *
 * Usage:
 * const api = useApi();
 * const data = await api("/api/users/me");
 */
export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const apiCall = async <T = unknown>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> => {
    // Get JWT token from Auth0
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: config.auth0_audience,
      },
    });

    // Make the API call with token in Authorization header
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check for errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: response.statusText,
      }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    // Return parsed JSON
    return response.json();
  };

  return apiCall;
};
