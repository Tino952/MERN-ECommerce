import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import userProfileThunk from "../store/userProfileThunk";
import getOrderThunk from "../store/getOrderThunk";
import { userActions } from "../store";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const Profilepage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: userLoading,
    user,
    success,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    loading: ordersLoading,
    orders,
    error: ordersError,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(userActions.resetSuccess());
    dispatch(getOrderThunk());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Passwords do not match");
    } else {
      message && setMessage(null);
      dispatch(userProfileThunk(name, email, password));
    }
  };

  return (
    <Row className="mx-2">
      {userError && <Message variant="danger">{userError}</Message>}
      {ordersError && <Message variant="danger">{ordersError}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {(userLoading || ordersLoading) && <LoadingSpinner />}
      <Col md={3} className="mx-1">
        <Form onSubmit={submitHandler}>
          <h1>Profile</h1>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter name"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              type="password"
              placeholder="Repeat password"
            ></Form.Control>
          </Form.Group>
          <Button className="mb-3" type="submit" variant="primary">
            Save
          </Button>
        </Form>
      </Col>
      <Col md={8} className="mx-1">
        <h1>My Orders</h1>
        <Table striped bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/orders/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.paymentResult.status === "COMPLETED"
                    ? order.paymentResult.paidAt.substring(0, 10)
                    : "NOT PAID"}
                </td>
                <td>{order.isDelivered ? "DELIVERED" : "NOT DELIVERED"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Profilepage;
