import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import userLoginThunk from "../store/userLoginThunk";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";
import FormContainer from "../components/FormContainer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginThunk(email, password));
  };

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <LoadingSpinner />}
      <Form onSubmit={submitHandler}>
        <h1>Sign in</h1>
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
        <Button className="mb-3" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <p>
        New User? <Link to="/register">Register</Link>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
