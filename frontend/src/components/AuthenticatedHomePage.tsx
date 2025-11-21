import { Container, Row, Col } from "react-bootstrap";
import ContactMeForm from "./subcomponents/ContactMeForm";
import WelcomeToWiki from "./homePageComponents/WelcomeToWikiCard";
import WhatIsDbdCard from "./homePageComponents/WhatisDbd";
import AboutThisProjectCard from "./homePageComponents/AboutThisProjectCard";
import OfficialResourcesCard from "./homePageComponents/OfficialResourcesCard";

const AuthenticatedHomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <WelcomeToWiki />
          <WhatIsDbdCard />
          <AboutThisProjectCard />
          <OfficialResourcesCard />
          <ContactMeForm />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthenticatedHomePage;
