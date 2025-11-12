import { useAuth0 } from "@auth0/auth0-react";
import { Container, Alert, Spinner, Button } from "react-bootstrap";

/**
 * AUTHENTICATION PATTERNS - Different ways to check if user is logged in
 */

// ============================================
// PATTERN 1: Redirect/Show Message
// ============================================
export const ProtectedPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Alert variant="warning">Please log in to view this page.</Alert>;
  }

  return <div>Protected content - only logged in users see this!</div>;
};

// ============================================
// PATTERN 2: Show Different Content
// ============================================
export const HomePage = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      {isAuthenticated ? (
        // Logged in view
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>You are logged in.</p>
        </div>
      ) : (
        // Not logged in view
        <div>
          <h1>Welcome to DBD Wiki!</h1>
          <p>Please log in to access favorites and more.</p>
        </div>
      )}
    </Container>
  );
};

// ============================================
// PATTERN 3: Conditional Rendering (Inline)
// ============================================
export const KillerCard = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <h2>The Trapper</h2>
      <p>Evan MacMillan</p>

      {/* Only show favorite button if logged in */}
      {isAuthenticated && <Button>Add to Favorites</Button>}

      {/* Show login prompt if not logged in */}
      {!isAuthenticated && (
        <p className="text-muted">Log in to add favorites</p>
      )}
    </div>
  );
};

// ============================================
// PATTERN 4: Get User Info
// ============================================
export const UserInfo = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return null;

  return (
    <div>
      <img src={user?.picture} alt="Profile" />
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
    </div>
  );
};

// ============================================
// PATTERN 5: Login/Logout Buttons
// ============================================
export const AuthButtons = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </Button>
    );
  }

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

// ============================================
// PATTERN 6: Protected Route Component
// ============================================
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Authentication Required</Alert.Heading>
          <p>Please log in to access this page.</p>
        </Alert>
      </Container>
    );
  }

  // User is authenticated - render the children
  return <>{children}</>;
};

// Usage of ProtectedRoute:
// <ProtectedRoute>
//   <FavoritesPage />
// </ProtectedRoute>

/**
 * AVAILABLE AUTH0 PROPERTIES:
 *
 * const {
 *   isAuthenticated,  // Boolean - is user logged in?
 *   isLoading,        // Boolean - is Auth0 checking authentication?
 *   user,             // Object - user info (name, email, picture, etc.)
 *   loginWithRedirect, // Function - trigger login
 *   logout,           // Function - trigger logout
 *   getAccessTokenSilently, // Function - get JWT token for API calls
 * } = useAuth0();
 *
 *
 * USER OBJECT STRUCTURE:
 * {
 *   sub: "auth0|123456",     // Unique user ID
 *   name: "John Doe",        // Full name
 *   email: "john@example.com",
 *   picture: "https://...",  // Profile picture URL
 *   nickname: "johndoe",
 *   email_verified: true,
 *   updated_at: "2024-01-01T00:00:00.000Z"
 * }
 */
