import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { cartActions } from "../store";
import CheckoutSteps from "../components/CheckoutSteps";

const Shippingpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedShipping = useSelector((state) => state.cart.shipping);
  const [address, setAddress] = useState(storedShipping.address);
  const [city, setCity] = useState(storedShipping.city);
  const [postalCode, setPostalCode] = useState(storedShipping.postalCode);
  const [country, setCountry] = useState(storedShipping.country);

  const submitHandler = (e) => {
    e.preventDefault();
    let shippingObject = { address, city, postalCode, country };
    dispatch(cartActions.addShipping(shippingObject));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <h1 className="my-3">Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            placeholder="Enter Address"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            placeholder="Enter City"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            type="text"
            placeholder="Enter Postal Code"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            type="text"
            placeholder="Enter Country"
            required
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          Proceed to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shippingpage;
