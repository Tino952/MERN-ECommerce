import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const differentLinks = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Link style={{ textDecoration: "none", pointerEvents: "none" }} to="/">
        hello!
      </Link>
      <Link to="/">hello!</Link>
      {/* Nav.Link only works with href */}
      <Nav.Link to="/">hellooo</Nav.Link>
      <LinkContainer to="/">
        <Nav.Link>hello there</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/" disabled>
        <Nav.Link>hello there</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default differentLinks;
