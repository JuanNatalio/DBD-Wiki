import { useAuth0 } from "@auth0/auth0-react";
import { useUserProfile } from "../hooks/useUser";
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";

export const Profile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: userProfile, isLoading, error } = useUserProfile();

  if (authLoading) return <AuthLoading />;

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

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="mb-4 fw-bold">User Profile</h1>

          <Card className="mb-4 shadow-lg border-0">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={3} className="text-center mb-3 mb-md-0">
                  {user?.picture && (
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="img-fluid rounded-circle shadow"
                      style={{ maxWidth: "150px" }}
                    />
                  )}
                </Col>
                <Col md={9}>
                  <h2 className="fw-bold mb-2">
                    {user?.name || "Unknown User"}
                  </h2>
                  <p className="text-muted mb-3">{user?.email}</p>
                  <div className="mb-2">
                    <span className="text-muted">Member since: </span>
                    <strong>
                      {userProfile?.createdAt
                        ? new Date(userProfile.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </strong>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <Card.Title className="mb-4 fw-bold">
                Favorites Summary
              </Card.Title>
              <Row className="text-center mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Card className="border shadow-sm">
                    <Card.Body>
                      <h5 className="text-muted mb-3">Favorite Killers</h5>
                      <p className="display-3 fw-bold text-danger mb-0">
                        {userProfile?.favoriteKillers.length || 0}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="border shadow-sm">
                    <Card.Body>
                      <h5 className="text-muted mb-3">Favorite Survivors</h5>
                      <p className="display-3 fw-bold text-primary mb-0">
                        {userProfile?.favoriteSurvivors.length || 0}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="text-center">
                <Link
                  to="/favorites"
                  className="btn btn-primary btn-lg shadow-sm"
                >
                  View My Favorites
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
