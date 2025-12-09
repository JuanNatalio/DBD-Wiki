import { Group, Image, Text, Container } from "@mantine/core";
import dbdLogo from "../assets/Logo_dbd.webp";

import OffCanvasContent from "./subcomponents/OffCanvasContent";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "var(--mantine-color-dark-7)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        padding: "1rem 0",
      }}
    >
      <Container size="xl">
        <Group justify="space-between">
          <Group
            gap="md"
            style={{ cursor: "pointer" }}
            onClick={handleBrandClick}
          >
            <Image src={dbdLogo} alt="DBD Logo" w={50} h={50} />
            <Text size="xl" fw={700} c="white">
              DBD Wiki
            </Text>
          </Group>
          <OffCanvasContent />
        </Group>
      </Container>
    </div>
  );
};

export default NavigationBar;
