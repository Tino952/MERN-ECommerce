import express from "express";
import protect from "../middelware/authmiddleware.js";
import {
  placeOrder,
  getOrder,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/myorders", protect, getOrders);
router.get("/:id", protect, getOrder);

export default router;
