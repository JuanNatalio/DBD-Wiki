# React Query Setup Complete! 🎉

## What Was Added

### 1. **Installed React Query**

```bash
npm install @tanstack/react-query
```

### 2. **Setup QueryClient** (`frontend/src/main.tsx`)

- Created QueryClient with default options
- Wrapped app with QueryClientProvider
- Configured cache settings (5 min stale time, 1 retry)

### 3. **Custom API Hook** (`frontend/src/hooks/useApi.ts`)

- `useApi()` - Automatically includes Auth0 JWT token in requests
- Handles token retrieval and Authorization header
- Throws errors for non-OK responses

### 4. **React Query Hooks** (`frontend/src/hooks/useUser.ts`)

All your API endpoints as easy-to-use hooks:

**Queries (GET requests):**

- `useUserProfile()` - Fetch current user's profile
- `useFavorites()` - Fetch favorites with full killer/survivor details

**Mutations (POST/DELETE requests):**

- `useSyncUser()` - Sync user from Auth0 to MongoDB
- `useAddFavoriteKiller()` - Add killer to favorites
- `useRemoveFavoriteKiller()` - Remove killer from favorites
- `useAddFavoriteSurvivor()` - Add survivor to favorites
- `useRemoveFavoriteSurvivor()` - Remove survivor from favorites

### 5. **Updated Profile Page** (`frontend/src/pages/Profile.tsx`)

- Replaced `useState` + `useEffect` + `fetch` with `useUserProfile()`
- Reduced from ~30 lines to ~10 lines
- Added proper loading/error states with Bootstrap components
- Fully functional with Auth0 + React Query

### 6. **Example Favorites Page** (`frontend/src/pages/Favorites.tsx`)

- Complete example showing multiple hooks together
- Displays favorite killers and survivors with cards
- Remove buttons with loading states
- Automatic cache updates after mutations

### 7. **Documentation** (`REACT_QUERY_GUIDE.md`)

- Complete guide comparing native fetch vs React Query
- Explains query keys, mutations, cache invalidation
- Step-by-step examples with code
- Debugging tips and common patterns

---

## How to Use

### Fetch Data (Query)

```typescript
import { useUserProfile } from "../hooks/useUser";

const MyComponent = () => {
  const { data, isLoading, error } = useUserProfile();

  if (isLoading) return <Spinner />;
  if (error) return <Alert>Error: {error.message}</Alert>;

  return <div>Welcome, {data.name}!</div>;
};
```

### Modify Data (Mutation)

```typescript
import { useAddFavoriteKiller } from "../hooks/useUser";

const MyComponent = () => {
  const addKiller = useAddFavoriteKiller();

  const handleClick = () => {
    addKiller.mutate(1); // Add killer with id 1
  };

  return (
    <button onClick={handleClick} disabled={addKiller.isPending}>
      {addKiller.isPending ? "Adding..." : "Add to Favorites"}
    </button>
  );
};
```

---

## Key Benefits

### Before (Native Fetch):

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

### After (React Query):

```typescript
const { data, isLoading, error } = useUserProfile();
```

**Result:** 66% less code, with caching, retries, and auto-refetching! 🚀

---

## Available Hooks

| Hook                          | Type     | Purpose                         | Usage                               |
| ----------------------------- | -------- | ------------------------------- | ----------------------------------- |
| `useUserProfile()`            | Query    | Get current user profile        | `const { data } = useUserProfile()` |
| `useFavorites()`              | Query    | Get favorites with full details | `const { data } = useFavorites()`   |
| `useSyncUser()`               | Mutation | Sync user from Auth0 to DB      | `syncUser.mutate()`                 |
| `useAddFavoriteKiller()`      | Mutation | Add killer to favorites         | `addKiller.mutate(id)`              |
| `useRemoveFavoriteKiller()`   | Mutation | Remove killer from favorites    | `removeKiller.mutate(id)`           |
| `useAddFavoriteSurvivor()`    | Mutation | Add survivor to favorites       | `addSurvivor.mutate(id)`            |
| `useRemoveFavoriteSurvivor()` | Mutation | Remove survivor from favorites  | `removeSurvivor.mutate(id)`         |

---

## What's Different in React Query v5

React Query v5 (what you have installed) changed some property names:

| Old (v4)               | New (v5)                  |
| ---------------------- | ------------------------- |
| `isLoading` (query)    | `isLoading` ✅ (same)     |
| `isLoading` (mutation) | `isPending` ⚠️ (changed!) |
| `isSuccess`            | `isSuccess` ✅ (same)     |
| `isError`              | `isError` ✅ (same)       |

**For mutations, use `isPending` instead of `isLoading`:**

```typescript
const addKiller = useAddFavoriteKiller();
addKiller.isPending; // ✅ Correct in v5
addKiller.isLoading; // ❌ Doesn't exist in v5
```

---

## Next Steps

1. ✅ **Profile Page** - Already implemented with React Query!
2. 🎯 **Add Favorites Page route** to your router
3. 🎯 **Create Killer/Survivor List pages** with favorite buttons
4. 🎯 **Call `useSyncUser()`** after login to ensure user exists in DB
5. 📦 **Optional: Install React Query DevTools** for debugging

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

---

## Learning Resources

- **REACT_QUERY_GUIDE.md** - Complete guide I created for you
- **Profile.tsx** - Working example with comments
- **Favorites.tsx** - Advanced example with multiple hooks
- [TanStack Query Docs](https://tanstack.com/query/latest) - Official docs

---

## Summary

React Query transforms your API calls from verbose, error-prone code into simple, powerful hooks. You now have:

✅ Automatic caching  
✅ Built-in loading states  
✅ Automatic retries  
✅ Cache invalidation  
✅ Optimistic updates  
✅ Less boilerplate

All your backend routes are now wrapped in easy-to-use hooks. Just import and use! 🎉
