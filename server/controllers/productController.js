import errorHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @description  -->    Fetch all products
// @route        -->    GET /api/products
// @access       -->    public

export const getProducts = errorHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @description  -->    Fetch single products
// @route        -->    GET /api/products/:id
// @access       -->    public

export const getProductsById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      throw new Error("incorrect product id");
    }
  } catch (err) {
    res.status(404);
    let error = { stack: err.stack, message: "product not found" };
    next(error);
  }
};

// router.get(
//   "/:id",
//   errorHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404);
//       throw new Error("product not found");
//     }
//   })
// );
