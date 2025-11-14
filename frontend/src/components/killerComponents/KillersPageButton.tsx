import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const KillersPageButton = () => {
  const navigate = useNavigate();
  const onKillersPageClick = () => {
    navigate("/killers");
  };

  return (
    <Button variant="secondary" size="lg" onClick={onKillersPageClick}>
      Killers
    </Button>
  );
};

export default KillersPageButton;
