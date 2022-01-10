import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { cartActions } from "../store";
import Message from "../components/Message";
import SelectQuantity from "../components/SelectQuantity";
import cartThunk from "../store/cartThunk";

const Cartpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const { id } = useParams();
  let quantity = searchParams.get("quantity");
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (id) {
      dispatch(cartThunk(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const productQuantityHandler = (item, e) => {
    dispatch(cartActions.addToCart({ ...item, quantity: e.target.value }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const checkoutHandler = () => {
    user ? navigate("/shipping") : navigate("/login");
  };

  return (
    <Row style={{ justifyContent: "end" }}>
      <Col lg={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 && (
          <Message>
            Shopping Cart is Empty
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                float: "right",
              }}
            >
              Go Back
            </Link>
          </Message>
        )}
        {cart.length > 0 && (
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroupItem key={item.id}>
                <Row
                  style={{ gridGap: "0.6rem" }}
                  className="flex-column flex-md-row"
                >
                  <Col md={3}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col>
                    <Row
                      style={{
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Col className="text-center text-md-start">
                        {item.name}
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      style={{
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Col
                        style={{
                          textAlign: "center",
                        }}
                      >
                        ${item.price}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={4} md={2} className="mx-auto">
                    <Row
                      style={{
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Col
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <SelectQuantity
                          product={item}
                          productQuantity={item.quantity}
                          productQuantityHandler={productQuantityHandler.bind(
                            null,
                            item
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={4} md={2} className="mx-auto">
                    <Row
                      style={{
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={removeFromCartHandler.bind(null, item.id)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={6} lg={4} className="mt-5">
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4 style={{ textAlign: "center" }}>
                Subtotal (
                {cart.reduce((acc, item) => acc + parseInt(item.quantity), 0)})
                Items
              </h4>

              <div style={{ textAlign: "center" }}>
                $
                {cart
                  .reduce(
                    (acc, item) =>
                      acc + parseFloat(item.quantity) * parseFloat(item.price),
                    0
                  )
                  .toLocaleString()}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                style={{ display: "block" }}
                className="mx-auto"
                variant="primary"
                onClick={checkoutHandler}
                disabled={cart.length === 0}
              >
                To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cartpage;
