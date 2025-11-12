# Authentication Check Guide

## Quick Answer

Use the `useAuth0` hook to check if a user is logged in:

```typescript
import { useAuth0 } from "@auth0/auth0-react";

const MyComponent = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Spinner />; // Auth0 is checking
  if (!isAuthenticated) return <div>Please log in</div>; // Not logged in

  return <div>Welcome!</div>; // Logged in ✅
};
```

---

## useAuth0 Properties

```typescript
const {
  isAuthenticated, // ✅ Boolean - is user logged in?
  isLoading, // ⏳ Boolean - is Auth0 still checking?
  user, // 👤 Object - user info (name, email, picture)
  loginWithRedirect, // 🔐 Function - trigger login
  logout, // 🚪 Function - trigger logout
  getAccessTokenSilently, // 🎫 Function - get JWT token for API calls
} = useAuth0();
```

---

## Common Patterns

### 1. Protect Entire Page

```typescript
export const FavoritesPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />; // Still checking
  }

  if (!isAuthenticated) {
    return <Alert>Please log in to view favorites</Alert>; // Blocked
  }

  // User is authenticated - show content
  return <div>Your favorites...</div>;
};
```

### 2. Show Different Content

```typescript
export const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome back, {user?.name}!</h1>
      ) : (
        <h1>Welcome! Please log in.</h1>
      )}
    </div>
  );
};
```

### 3. Conditional Button

```typescript
export const KillerCard = ({ killer }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Card>
      <Card.Title>{killer.name}</Card.Title>

      {/* Only show if logged in */}
      {isAuthenticated && <FavoriteButton killerId={killer.id} />}

      {/* Only show if NOT logged in */}
      {!isAuthenticated && <p>Log in to add favorites</p>}
    </Card>
  );
};
```

### 4. Reusable Protected Route

```typescript
// Create a reusable wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Alert>Login required</Alert>;

  return <>{children}</>;
};

// Use it to wrap any page
<ProtectedRoute>
  <FavoritesPage />
</ProtectedRoute>;
```

---

## Your Favorites Page (Already Updated!)

I already updated your `Favorites.tsx` page to check authentication:

```typescript
export const Favorites = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  // Still checking authentication
  if (authLoading) {
    return <Spinner />;
  }

  // User is NOT logged in
  if (!isAuthenticated) {
    return <Alert>Please log in to view your favorites.</Alert>;
  }

  // User IS logged in - show favorites
  // ... rest of your code
};
```

---

## User Information

Access user data from Auth0:

```typescript
const { user } = useAuth0();

console.log(user?.name); // "John Doe"
console.log(user?.email); // "john@example.com"
console.log(user?.picture); // "https://..." (profile pic URL)
console.log(user?.sub); // "auth0|123456" (unique user ID)
```

---

## Login/Logout Buttons

### Login Button

```typescript
const { loginWithRedirect } = useAuth0();

<Button onClick={() => loginWithRedirect()}>Log In</Button>;
```

### Logout Button

```typescript
const { logout } = useAuth0();

<Button
  onClick={() =>
    logout({
      logoutParams: { returnTo: globalThis.location.origin },
    })
  }
>
  Log Out
</Button>;
```

---

## Complete Example

```typescript
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";

const MyPage = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

  // Loading state
  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="info">
          <Alert.Heading>Welcome!</Alert.Heading>
          <p>Please log in to continue.</p>
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        </Alert>
      </Container>
    );
  }

  // Logged in!
  return (
    <Container className="mt-5">
      <h1>Welcome, {user?.name}!</h1>
      <img src={user?.picture} alt="Profile" className="rounded-circle" />
      <p>Email: {user?.email}</p>
    </Container>
  );
};
```

---

## Testing

### Scenario 1: User not logged in

- `isLoading` = `false`
- `isAuthenticated` = `false`
- `user` = `undefined`

### Scenario 2: User logged in

- `isLoading` = `false`
- `isAuthenticated` = `true` ✅
- `user` = `{ name: "...", email: "...", ... }`

### Scenario 3: Checking auth (page just loaded)

- `isLoading` = `true` ⏳
- `isAuthenticated` = `false`
- `user` = `undefined`

---

## Summary

✅ **Check if logged in:** `const { isAuthenticated } = useAuth0();`

✅ **Handle loading:** `if (isLoading) return <Spinner />;`

✅ **Protect pages:** `if (!isAuthenticated) return <Alert>Login required</Alert>;`

✅ **Get user info:** `const { user } = useAuth0();` then use `user?.name`, `user?.email`, etc.

✅ **Login/Logout:** Use `loginWithRedirect()` and `logout()` functions

---

## More Examples

See `frontend/src/examples/AuthExamples.tsx` for 6 different authentication patterns!
