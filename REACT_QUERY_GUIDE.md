# React Query Guide - API Calls Made Easy

## What is React Query?

React Query (TanStack Query) is a powerful library for managing server state in React applications. Instead of using `useState` + `useEffect` + `fetch`, React Query provides hooks that handle all the complexity for you.

## Why Use React Query Instead of Native Fetch?

### With Native Fetch (the old way):

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently({
        audience: config.auth0_audience,
      });
      const response = await fetch("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

**Problems:**

- ❌ Lots of boilerplate code
- ❌ No caching (refetches every time component mounts)
- ❌ No automatic retries on failure
- ❌ Hard to share data between components
- ❌ No optimistic updates
- ❌ Race conditions possible

### With React Query (the new way):

```typescript
const { data, isLoading, error } = useUserProfile();
```

**Benefits:**

- ✅ One line of code!
- ✅ Automatic caching (won't refetch unnecessarily)
- ✅ Built-in loading and error states
- ✅ Automatic retries on failure
- ✅ Easy data sharing across components
- ✅ Optimistic updates built-in
- ✅ No race conditions

---

## How It Works in Your App

### 1. Setup (main.tsx)

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

// Wrap your app with QueryClientProvider
<QueryClientProvider client={queryClient}>
  <Auth0Provider ...>
    <App />
  </Auth0Provider>
</QueryClientProvider>
```

**What this does:**

- Creates a global cache for all your API data
- Configures default behavior (retry attempts, cache time, etc.)
- Makes React Query hooks available to all components

---

### 2. Custom Hook: useApi (hooks/useApi.ts)

This hook wraps `fetch` to automatically include Auth0 JWT tokens:

```typescript
export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const apiCall = async (endpoint: string, options?: RequestInit) => {
    // 1. Get JWT token from Auth0
    const token = await getAccessTokenSilently({
      authorizationParams: { audience: config.auth0_audience },
    });

    // 2. Make API call with token
    const response = await fetch(`http://localhost:8080${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // 3. Handle errors
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // 4. Return parsed JSON
    return response.json();
  };

  return apiCall;
};
```

**Usage:**

```typescript
const api = useApi();
const data = await api("/api/users/me");
```

---

### 3. React Query Hooks (hooks/useUser.ts)

#### **useUserProfile** - Fetch user data (GET request)

```typescript
export const useUserProfile = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["userProfile"], // Unique identifier for this query
    queryFn: () => api<UserProfile>("/api/users/me"), // Function that fetches the data
  });
};
```

**Usage in components:**

```typescript
const { data, isLoading, error, refetch } = useUserProfile();

if (isLoading) return <Spinner />;
if (error) return <Alert>Error: {error.message}</Alert>;
return <div>Welcome, {data.name}!</div>;
```

**React Query provides:**

- `data` - The fetched data (or undefined if loading/error)
- `isLoading` - Boolean indicating if request is in progress
- `error` - Error object if request failed
- `refetch` - Function to manually refetch data

---

#### **useAddFavoriteKiller** - Add killer to favorites (POST request)

```typescript
export const useAddFavoriteKiller = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (killerId: number) =>
      api(`/api/users/favorites/killers/${killerId}`, { method: "POST" }),

    // After success, invalidate queries to refetch updated data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
```

**Usage in components:**

```typescript
const addKiller = useAddFavoriteKiller();

const handleAddFavorite = (killerId: number) => {
  addKiller.mutate(killerId);
};

return (
  <button onClick={() => handleAddFavorite(1)} disabled={addKiller.isLoading}>
    {addKiller.isLoading ? "Adding..." : "Add to Favorites"}
  </button>
);
```

**useMutation provides:**

- `mutate(killerId)` - Function to trigger the mutation
- `isLoading` - Boolean indicating if mutation is in progress
- `error` - Error object if mutation failed
- `isSuccess` - Boolean indicating if mutation succeeded

**Key concept: `invalidateQueries`**

- After adding a killer, the user's profile data is outdated
- `invalidateQueries` tells React Query: "This data is stale, refetch it"
- Any component using `useUserProfile()` will automatically get fresh data!

---

### 4. Using React Query in Components (Profile.tsx)

**Before (with native fetch):**

```typescript
const Profile = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently({
          audience: config.auth0_audience,
        });
        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, getAccessTokenSilently]);

  // ... rendering logic
};
```

**After (with React Query):**

```typescript
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { data: userProfile, isLoading, error } = useUserProfile();

  if (!isAuthenticated) return <div>Please log in</div>;
  if (isLoading) return <Spinner />;
  if (error) return <Alert>Error: {error.message}</Alert>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Favorite Killers: {userProfile.favoriteKillers.length}</p>
    </div>
  );
};
```

**Lines of code:**

- Before: ~30 lines
- After: ~10 lines
- 66% reduction! 🎉

---

## React Query Key Concepts

### Query Keys

Query keys uniquely identify each query:

```typescript
useQuery({ queryKey: ["userProfile"] });
useQuery({ queryKey: ["favorites"] });
useQuery({ queryKey: ["killers"] });
useQuery({ queryKey: ["killer", 1] }); // Query for specific killer
```

**Why important:**

- React Query uses keys to cache data
- Same key = same cached data
- Different keys = separate cache entries

**Example:**

```typescript
// Component A
const { data } = useQuery({ queryKey: ["userProfile"], queryFn: fetchUser });

// Component B (different component, same key!)
const { data } = useQuery({ queryKey: ["userProfile"], queryFn: fetchUser });

// Result: Only ONE API call is made! Component B gets cached data from Component A
```

---

### Queries vs Mutations

**Query** (useQuery):

- For **reading** data (GET requests)
- Cached automatically
- Can be refetched automatically
- Use for: fetching user profile, favorites list, killers, survivors

**Mutation** (useMutation):

- For **changing** data (POST, PUT, DELETE requests)
- Not cached
- Must be triggered manually with `mutate()`
- Use for: adding/removing favorites, updating profile

---

### Cache Invalidation

When data changes, you need to tell React Query to refetch:

```typescript
const addKiller = useMutation({
  mutationFn: (id) =>
    api(`/api/users/favorites/killers/${id}`, { method: "POST" }),

  onSuccess: () => {
    // Tell React Query: "userProfile data is stale, refetch it"
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  },
});
```

**What happens:**

1. User clicks "Add to Favorites"
2. POST request sent to API
3. API updates database
4. Mutation succeeds, `onSuccess` runs
5. `invalidateQueries` marks "userProfile" as stale
6. Any component using `useUserProfile()` automatically refetches
7. UI updates with new data! ✨

---

### Stale Time

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

**What it means:**

- Data is considered "fresh" for 5 minutes
- During this time, React Query won't refetch automatically
- After 5 minutes, data becomes "stale" and will refetch when component mounts

**Example timeline:**

```
0:00 - Component mounts → fetch data from API
0:30 - Component unmounts
1:00 - Component mounts again → use cached data (still fresh!)
6:00 - Component mounts → refetch from API (stale after 5 min)
```

---

## Complete Example: Favorites Button

Let's put it all together with a "Add to Favorites" button:

```typescript
import {
  useAddFavoriteKiller,
  useRemoveFavoriteKiller,
  useUserProfile,
} from "../hooks/useUser";
import { Button, Spinner } from "react-bootstrap";

const FavoriteButton = ({ killerId }: { killerId: number }) => {
  // Get current user profile to check if killer is already favorited
  const { data: profile } = useUserProfile();

  // Get mutation hooks
  const addKiller = useAddFavoriteKiller();
  const removeKiller = useRemoveFavoriteKiller();

  // Check if this killer is in favorites
  const isFavorited = profile?.favoriteKillers.includes(killerId);

  // Handle button click
  const handleToggle = () => {
    if (isFavorited) {
      removeKiller.mutate(killerId);
    } else {
      addKiller.mutate(killerId);
    }
  };

  // Show loading state while mutation is in progress
  const isLoading = addKiller.isLoading || removeKiller.isLoading;

  return (
    <Button
      variant={isFavorited ? "success" : "outline-primary"}
      onClick={handleToggle}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" animation="border" /> Loading...
        </>
      ) : isFavorited ? (
        "❤️ Favorited"
      ) : (
        "🤍 Add to Favorites"
      )}
    </Button>
  );
};
```

**What happens when user clicks:**

1. `handleToggle` called
2. `addKiller.mutate(killerId)` sends POST request
3. Button shows "Loading..." (isLoading = true)
4. API responds successfully
5. `onSuccess` invalidates "userProfile" query
6. `useUserProfile()` refetches in background
7. New data arrives with killerId in favorites array
8. `isFavorited` becomes true
9. Button changes to "❤️ Favorited"

All automatic! No manual state updates needed! 🎉

---

## Debugging React Query

### React Query DevTools

Add this to see what's happening:

```bash
npm install @tanstack/react-query-devtools
```

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>;
```

**Features:**

- See all active queries
- View cached data
- See loading/error states
- Manually refetch or invalidate
- Timeline of requests

---

## Common Patterns

### 1. Dependent Queries

Fetch user, THEN fetch their favorites:

```typescript
const { data: user } = useUserProfile();

const { data: favorites } = useFavorites({
  enabled: !!user, // Only fetch if user exists
});
```

---

### 2. Optimistic Updates

Update UI immediately, rollback if fails:

```typescript
const addKiller = useMutation({
  mutationFn: (id) => api(`/favorites/killers/${id}`, { method: "POST" }),

  // Update cache immediately
  onMutate: async (killerId) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["userProfile"] });

    // Snapshot current value
    const previous = queryClient.getQueryData(["userProfile"]);

    // Optimistically update cache
    queryClient.setQueryData(["userProfile"], (old) => ({
      ...old,
      favoriteKillers: [...old.favoriteKillers, killerId],
    }));

    // Return context with snapshot
    return { previous };
  },

  // Rollback on error
  onError: (err, variables, context) => {
    queryClient.setQueryData(["userProfile"], context.previous);
  },

  // Refetch after success
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  },
});
```

---

### 3. Pagination

```typescript
const useKillers = (page: number) => {
  return useQuery({
    queryKey: ["killers", page],
    queryFn: () => api(`/api/killers?page=${page}`),
    keepPreviousData: true, // Show old data while loading new page
  });
};
```

---

## Summary

**React Query replaces:**

- ✅ `useState` for data, loading, error
- ✅ `useEffect` for fetching on mount
- ✅ Manual caching logic
- ✅ Manual refetch logic
- ✅ Manual loading state management

**You get for free:**

- ✅ Automatic caching
- ✅ Automatic retries
- ✅ Automatic refetching
- ✅ Loading/error states
- ✅ Data synchronization
- ✅ Optimistic updates
- ✅ Request deduplication

**Less code, more features!** 🚀

---

## Next Steps

1. Use `useUserProfile()` in Profile.tsx ✅ (already done!)
2. Create favorites button component with `useAddFavoriteKiller()`
3. Create favorites page with `useFavorites()`
4. Add `useSyncUser()` call after login
5. Add React Query DevTools for debugging
6. Explore optimistic updates for better UX

Happy querying! 🎉
