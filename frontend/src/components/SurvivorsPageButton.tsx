import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SurvivorsPageButton = () => {
  const navigate = useNavigate();
  const onSurvivorsPageClick = () => {
    navigate("/survivors");
  };

  return (
    <Button variant="secondary" size="lg" onClick={onSurvivorsPageClick}>
      Survivors
    </Button>
  );
};

export default SurvivorsPageButton;
