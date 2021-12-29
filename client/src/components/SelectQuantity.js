import { Form } from "react-bootstrap";

const SelectQuantity = ({
  product,
  productQuantity,
  productQuantityHandler,
}) => {
  return (
    <Form.Control
      as="select"
      value={productQuantity}
      onChange={productQuantityHandler}
      className="py-1"
      style={{
        height: "1.6rem",
        lineHeight: "1.2rem",
        textAlign: "center",
      }}
    >
      {[...Array(product.countInStock).keys()].map((num) => (
        <option key={num + 1} value={num + 1}>
          {num + 1}
        </option>
      ))}
    </Form.Control>
  );
};

export default SelectQuantity;
