import { useParams } from "react-router-dom";
import { useKillers } from "../hooks/useUser";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import { Container } from "react-bootstrap";

const KillerDetails = () => {
  const { id } = useParams();
  const killerId = id ? parseInt(id, 10) : NaN;
  const { data: killers, isLoading, error } = useKillers();

  if (isLoading) return <DataLoading />;
  if (error) return <ErrorWhenFetching error={error} />;

  if (!killers || Number.isNaN(killerId)) {
    return <Container className="mt-4">Invalid killer id.</Container>;
  }

  const killerToDisplay = killers.find((killer) => {
    return killer.id === killerId;
  });

  return <div>{killerToDisplay?.name}</div>;
};
export default KillerDetails;
