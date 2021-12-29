import { useDispatch, useSelector } from "react-redux";
import productListThunk from "../store/productListThunk";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/Message";
import Product from "../components/Product";

const Homepage = () => {
  const dispatch = useDispatch();
  // effects
  useEffect(() => {
    dispatch(productListThunk());
  }, [dispatch]);

  // getting context
  let { products, loading, error } = useSelector((state) => state.productList);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage variant={"danger"}>{error}</ErrorMessage>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homepage;
