import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${port}`)
);

app.get("/", (req, res) => {
  res.send("App is Running....");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  res.json(products.find((product) => product._id === req.params.id));
});
