import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";

const Productpage = () => {
  const [product, setProduct] = useState({ value: "", text: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const inStock = product && product.countInStock > 0;

  return (
    <Row className="justify-content-center">
      <Col>
        <LinkContainer to="/">
          <Button variant="light">Go Back</Button>
        </LinkContainer>
      </Col>
      <Row className="my-3">
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col className="mt-sm-3 mt-md-0" md={6}>
          <ListGroup variant="flush" style={{ gridGap: "10px" }}>
            <ListGroupItem>
              <h4>{product.name}</h4>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
          <Row className="justify-content-start ms-1 mt-3">
            <Col xs="auto">
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col className="text-end">
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col className="text-end" xs="auto">
                        {inStock ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row className="justify-content-center">
                      <LinkContainer
                        to="/cart"
                        className="mx-3 my-2"
                        style={{ width: "10rem" }}
                      >
                        <Button disabled={!inStock} variant="dark">
                          Add to Cart
                        </Button>
                      </LinkContainer>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default Productpage;
