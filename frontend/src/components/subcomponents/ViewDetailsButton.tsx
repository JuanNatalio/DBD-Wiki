import type { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ViewDetailsButtonProps {
  id: number;
  isKiller: boolean;
}

const ViewDetailsButton: FC<ViewDetailsButtonProps> = ({ id, isKiller }) => {
  const navigate = useNavigate();

  const viewMoreDetails = (isKiller: boolean) => {
    if (isKiller) navigate(`/killer/${id}`);
    else navigate(`/survivor/${id}`);
  };
  return (
    <Button
      variant="outline-info"
      size="sm"
      onClick={() => {
        viewMoreDetails(isKiller);
      }}
      className="shadow-sm"
    >
      <FontAwesomeIcon icon="eye" className="me-1" />
      View Details
    </Button>
  );
};

export default ViewDetailsButton;
