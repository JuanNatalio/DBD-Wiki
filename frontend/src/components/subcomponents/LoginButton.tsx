import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="default" size="lg" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};
export default LoginButton;
