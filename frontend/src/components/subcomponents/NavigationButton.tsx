import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";

interface NavigationButtonProps {
  to: string;
  label: string;
  variant?: string;
  size?: string;
}

const NavigationButton: FC<NavigationButtonProps> = ({
  to,
  label,
  variant = "default",
  size = "lg",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button variant={variant} size={size} onClick={handleClick}>
      {label}
    </Button>
  );
};

export default NavigationButton;
