import type { FC } from "react";
import { Button } from "@mantine/core";
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
      variant="outline"
      color="cyan"
      size="xs"
      onClick={() => {
        viewMoreDetails(isKiller);
      }}
      leftSection={<FontAwesomeIcon icon="eye" />}
    >
      View Details
    </Button>
  );
};

export default ViewDetailsButton;
