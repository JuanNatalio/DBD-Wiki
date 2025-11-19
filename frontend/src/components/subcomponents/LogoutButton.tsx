import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={() =>
        logout({ logoutParams: { returnTo: globalThis.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
