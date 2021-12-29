import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import { URLNotFound, productNotFound } from "./middelware/errormiddleware.js";

const app = express();

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${port}`.yellow
  )
);

connectDB();

app.get("/", (req, res) => {
  res.send("App is Running....");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(URLNotFound);

app.use(productNotFound);
