import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FavoritesPageButton = () => {
  const navigate = useNavigate();
  const onFavoritesPageClick = () => {
    navigate("/favorites");
  };

  return (
    <Button variant="secondary" size="lg" onClick={onFavoritesPageClick}>
      Favorites
    </Button>
  );
};

export default FavoritesPageButton;
