import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePageButton = () => {
  const navigate = useNavigate();
  const onHomePageClick = () => {
    navigate("/");
  };

  return (
    <Button variant="secondary" size="lg" onClick={onHomePageClick}>
      Home
    </Button>
  );
};

export default HomePageButton;
