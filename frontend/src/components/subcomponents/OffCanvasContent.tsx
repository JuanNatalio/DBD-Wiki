import { Button, Drawer, Stack, Divider, Text } from "@mantine/core";
import NavigationButton from "./NavigationButton";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const OffCanvasContent = () => {
  const { isAuthenticated } = useAuth0();
  const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false);

  const handleClose = () => {
    setShowOffCanvas(!showOffCanvas);
  };

  return (
    <>
      <Button onClick={handleClose} size="lg" variant="default">
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer
        opened={showOffCanvas}
        onClose={handleClose}
        position="right"
        title="Navigation"
        size="sm"
      >
        <Stack gap="lg">
          {isAuthenticated ? (
            <>
              <div>
                <Text size="sm" c="dimmed" mb="md">
                  Pages
                </Text>
                <Stack gap="sm">
                  <NavigationButton to="/" label="Home" />
                  <NavigationButton to="/killers" label="Killers" />
                  <NavigationButton to="/survivors" label="Survivors" />
                  <NavigationButton to="/favorites" label="Favorites" />
                </Stack>
              </div>
              <Divider />
              <div>
                <Text size="sm" c="dimmed" mb="md">
                  Account
                </Text>
                <Stack gap="sm">
                  <NavigationButton to="/profile" label="Profile" />
                </Stack>
              </div>
              <Divider />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </Stack>
      </Drawer>
    </>
  );
};
export default OffCanvasContent;
