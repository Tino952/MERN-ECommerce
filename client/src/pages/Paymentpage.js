import { useState } from "react";
import { useNavigate } from "react-router";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";

const Paymentpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("Paypal");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cartActions.addPayment(payment));
    navigate("/order");
  };

  return (
    <FormContainer>
      <h1 className="my-3">Payment</h1>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" onChange={(e) => setPayment(e.target.id)}>
          <Form.Label>Select Payment Method:</Form.Label>
          <Form.Check
            type="radio"
            label="Paypal or Credit Card"
            id="Paypal"
            name="payment"
          />
          <Form.Check name="payment" type="radio" label="Stripe" id="Stripe" />
        </Form.Group>
        <Button type="submit" variant="primary">
          Order
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Paymentpage;
