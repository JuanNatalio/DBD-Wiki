import { useAuth0 } from "@auth0/auth0-react";
import { useUserProfile, useSyncUser } from "../hooks/useUser";
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import NotAuthenticated from "../components/NotAuthenticated";
import AuthLoading from "../components/AuthLoading";

/**
 * PROFILE PAGE - Displays authenticated user's information
 *
 * This example shows how to use React Query instead of native fetch!
 *
 * Benefits of React Query:
 * - Automatic caching (no unnecessary refetches)
 * - Built-in loading and error states
 * - Automatic retries on failure
 * - Easy data synchronization
 * - Optimistic updates
 */

export const Profile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: userProfile, isLoading, error } = useUserProfile();

  const syncUser = useSyncUser();

  useEffect(() => {
    if (isAuthenticated && error) {
      syncUser.mutate();
    }
  }, [isAuthenticated, error, syncUser]);

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" aria-label="Loading profile" />
        <p className="mt-3">Loading your profile...</p>
      </Container>
    );
  }

  if (error) {
    // If syncing user, show loading instead of error
    if (syncUser.isPending) {
      return (
        <Container className="mt-5 text-center">
          <Spinner animation="border" aria-label="Creating profile" />
          <p className="mt-3">Setting up your profile...</p>
        </Container>
      );
    }

    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Profile</Alert.Heading>
          <p>{error.message}</p>
          <p className="text-muted">
            <small>
              This usually means your account needs to be synced. Please refresh
              the page.
            </small>
          </p>
        </Alert>
      </Container>
    );
  }

  // Success - display profile
  return (
    <Container className="mt-5">
      <h1 className="mb-4">User Profile</h1>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={2}>
              {user?.picture && (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                />
              )}
            </Col>
            <Col md={10}>
              <h2>{user?.name || "Unknown User"}</h2>
              <p className="text-muted">{user?.email}</p>
              <p>
                <strong>Auth0 ID:</strong> {userProfile?.auth0Id}
              </p>
              <p className="text-muted">
                <small>
                  Member since:{" "}
                  {userProfile?.createdAt
                    ? new Date(userProfile.createdAt).toLocaleDateString()
                    : "Unknown"}
                </small>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Favorites Summary</Card.Title>
          <Row className="mb-3">
            <Col md={6}>
              <h5>Favorite Killers</h5>
              <p className="display-4">
                {userProfile?.favoriteKillers.length || 0}
              </p>
            </Col>
            <Col md={6}>
              <h5>Favorite Survivors</h5>
              <p className="display-4">
                {userProfile?.favoriteSurvivors.length || 0}
              </p>
            </Col>
          </Row>
          <Link to="/favorites" className="btn btn-primary">
            View My Favorites
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
