import { useEffect } from "react";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col, ListGroup, Image, ListGroupItem } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getOrderThunk from "../store/getOrderThunk";
import { cartActions, orderActions } from "../store";

const Confirmationpage = () => {
  const dispatch = useDispatch();
  const { summary, id } = useParams();
  let { order, error, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(orderActions.resetSuccess());
    dispatch(cartActions.clearCart());
    dispatch(orderActions.resetOrder());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderThunk(id));
  }, [dispatch, id]);

  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <LoadingSpinner />}
      {summary &&
        order.paymentResult &&
        order.paymentResult.status === "COMPLETED" && (
          <Message variant="success">Thanks for your order!</Message>
        )}
      {!order._id || order.paymentResult.status !== "COMPLETED" ? (
        <Message variant="danger">Oops, something went wrong</Message>
      ) : (
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order</h2>
              <p>
                <strong>Order Id:</strong> {order._id}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                {order.shipping.address}, {order.shipping.city},{" "}
                {order.shipping.postalCode}, {order.shipping.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Payment Method:</strong> {order.payment}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items</h2>
              {order.cart.length > 0 &&
                order.cart.map((item) => (
                  <ListGroup variant="flush" key={item.id}>
                    <ListGroupItem>
                      <Row className="flex-column justify-content-center flex-sm-row align-items-sm-center">
                        <Col xs={6} sm={4} md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
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
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      )}
    </Row>
  );
};

export default Confirmationpage;
