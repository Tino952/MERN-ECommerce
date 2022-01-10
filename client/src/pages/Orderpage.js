import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import placeOrderThunk from "../store/placeOrderThunk";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { orderActions } from "../store";

const Orderpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paypalResponse, setPaypalResponse] = useState(null);
  const { cart, payment, shipping } = useSelector((state) => state.cart);
  const {
    order: { _id: orderId },
    success,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(orderActions.resetSuccess());
    return () => {
      dispatch(orderActions.resetOrder());
    };
  }, [dispatch]);

  const clickHandler = () => {
    let order = {
      cart,
      payment,
      shipping,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    if (paypalResponse) {
      order.paymentResult = paypalResponse.value;
    }
    dispatch(placeOrderThunk(order));
  };

  useEffect(() => {
    orderId && success && navigate(`/orders/summary/${orderId}`);
  }, [navigate, success, orderId]);

  const itemsPrice = cart.reduce(
    (acc, next) => acc + Number(next.price) * Number(next.quantity),
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 8.99;
  const taxPrice = (itemsPrice * 0.2).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  const totalPrice = (itemsPrice + shippingPrice).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      <CheckoutSteps step1 step2 step3 step4 />
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address:</strong> {shipping.address}, {shipping.city},{" "}
              {shipping.postalCode}, {shipping.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment</h2>
            <p>
              <strong>Payment Method:</strong> {payment}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <ListGroup variant="flush" key={item.id}>
                  <ListGroupItem>
                    <Row className="flex-column justify-content-center flex-sm-row align-items-sm-center">
                      <Col xs={6} sm={4} md={3}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Col xs={"auto"}>
                          <Link to={`/product/${item.id}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col xs={"auto"}>
                          Price: ${item.price.toLocaleString()}
                        </Col>
                        <Col xs={"auto"}>Quantity: {item.quantity}</Col>
                        <Col xs={"auto"}>
                          <strong>Total: </strong>
                          {(item.price * item.quantity).toLocaleString()}
                        </Col>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              ))
            ) : (
              <p>"No items in Cart"</p>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <h2>Order Summary</h2>
        <ListGroup>
          <ListGroupItem>
            Items: $
            {itemsPrice.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </ListGroupItem>
          <ListGroupItem>Shipping: ${shippingPrice}</ListGroupItem>
          <ListGroupItem>VAT: ${taxPrice}</ListGroupItem>
          <ListGroupItem>Total: ${totalPrice}</ListGroupItem>
        </ListGroup>
        <ListGroup className="mt-3">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  return orderId;
                });
            }}
            onApprove={function (data, actions) {
              setPaypalResponse(actions.order.capture());
            }}
          />
        </ListGroup>
        <Button
          variant="primary"
          onClick={clickHandler}
          style={{ display: "block", marginLeft: "auto" }}
          className="mt-3"
          disabled={!paypalResponse}
        >
          Place Order
        </Button>
      </Col>
    </Row>
  );
};

export default Orderpage;
