import { Container } from "@mantine/core";
import ContactMeForm from "./subcomponents/ContactMeForm";
import WelcomeToWiki from "./homePageComponents/WelcomeToWikiCard";
import WhatIsDbdCard from "./homePageComponents/WhatisDbd";
import AboutThisProjectCard from "./homePageComponents/AboutThisProjectCard";
import OfficialResourcesCard from "./homePageComponents/OfficialResourcesCard";

const AuthenticatedHomePage = () => {
  return (
    <Container size="lg" mt="xl">
      <WelcomeToWiki />
      <WhatIsDbdCard />
      <AboutThisProjectCard />
      <OfficialResourcesCard />
      <ContactMeForm />
    </Container>
  );
};

export default AuthenticatedHomePage;
