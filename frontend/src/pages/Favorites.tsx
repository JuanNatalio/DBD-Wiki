import { useFavorites } from "../hooks/useUser";
import { Container, Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import FavoritedSurvivors from "../components/survivorComponents/FavoritedSurvivors";
import FavoritedKillers from "../components/killerComponents/FavoritedKillers";

export const Favorites = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data, isLoading, error } = useFavorites();

  if (authLoading) return <AuthLoading />;

  if (!isAuthenticated) return <NotAuthenticated />;

  if (isLoading) return <DataLoading />;

  if (error) return <ErrorWhenFetching error={error} />;

  if (!data?.favoriteKillers.length && !data?.favoriteSurvivors.length) {
    return (
      <Container className="mt-5">
        <Card className="shadow-lg border-0 text-center p-5">
          <Card.Body>
            <h2 className="mb-3">No Favorites Yet</h2>
            <p className="text-muted lead">
              Start adding killers and survivors to your favorites!
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">My Favorites</h1>
      <section className="mb-5">
        <FavoritedKillers data={data} />
      </section>
      <section>
        <FavoritedSurvivors data={data} />
      </section>
    </Container>
  );
};

export default Favorites;
