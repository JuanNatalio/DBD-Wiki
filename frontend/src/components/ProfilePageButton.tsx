import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfilePageButton = () => {
  const navigate = useNavigate();
  const onProfilePageClick = () => {
    navigate("/profile");
  };

  return (
    <Button variant="secondary" size="lg" onClick={onProfilePageClick}>
      Profile
    </Button>
  );
};

export default ProfilePageButton;
