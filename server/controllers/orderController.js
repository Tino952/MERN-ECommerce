import Order from "../models/orderModel.js";

// @description  -->    Place an order
// @route        -->    POST /api/orders
// @access       -->    private

export const placeOrder = async (req, res, next) => {
  try {
    const {
      cart,
      payment,
      shipping,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
    } = req.body;
    if (cart && cart.length === 0) {
      res.status(400);
      throw new Error("No items in cart");
    } else {
      const order = new Order({
        user: req.user._id,
        cart,
        payment,
        shipping,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      if (paymentResult && paymentResult.status === "COMPLETED") {
        order.isPaid = true;
        order.paymentResult = {
          id: paymentResult.id,
          status: paymentResult.status,
          paidAt: paymentResult.update_time,
          email: paymentResult.payer.email_address,
        };
      } else {
        order.paymentResult = {
          status: "INCOMPLETED",
        };
      }
      const placedOrder = await order.save();
      res.status(201).json(placedOrder);
    }
  } catch (err) {
    res.status(400);
    next(err);
  }
};

// @description  -->    Fetch an order
// @route        -->    GET /api/orders/id
// @access       -->    private

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    res.status(201);
    res.json(order);
  } catch (err) {
    res.status(400);
    let error = { stack: err.stack, message: "order not found" };
    next(error);
  }
};

// @description  -->    Fetch all user orders
// @route        -->    GET /api/orders/myorders
// @access       -->    private

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(201);
    res.json(orders);
  } catch (err) {
    res.status(400);
    let error = { stack: err.stack, message: "orders not found" };
    next(error);
  }
};
