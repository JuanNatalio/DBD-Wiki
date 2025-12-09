import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="default"
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
