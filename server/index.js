import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";
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

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/build")));
  // app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(URLNotFound);

app.use(productNotFound);
