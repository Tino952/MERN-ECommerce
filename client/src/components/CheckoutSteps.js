import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const checkoutSteps = ({ step1, step2, step3, step4 }) => {
  let step1Disable = step1 ? false : true;
  let step2Disable = step2 ? false : true;
  let step3Disable = step3 ? false : true;
  let step4Disable = step4 ? false : true;

  return (
    <Nav className="justify-content-center mb-4">
      <LinkContainer disabled={step1Disable} to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer disabled={step2Disable} to="/shipping">
        <Nav.Link>Shipping</Nav.Link>
      </LinkContainer>
      <LinkContainer disabled={step3Disable} to="/payment">
        <Nav.Link>Payment</Nav.Link>
      </LinkContainer>
      <LinkContainer disabled={step4Disable} to="/order">
        <Nav.Link>Place Order</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default checkoutSteps;
