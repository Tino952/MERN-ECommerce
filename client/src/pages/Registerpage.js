import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import userRegisterThunk from "../store/userRegisterThunk";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";
import FormContainer from "../components/FormContainer";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Passwords do not match");
    } else {
      message && setMessage(null);
      dispatch(userRegisterThunk(name, email, password));
    }
  };

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <LoadingSpinner />}
      <Form onSubmit={submitHandler}>
        <h1>Register</h1>
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
          Register
        </Button>
      </Form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
