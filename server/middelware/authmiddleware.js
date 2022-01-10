import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  // error handler for unhandeled promise rejections
  process.on("unhandledRejection", function (err) {
    next(err);
  });

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("User not found, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("User not found, invalid token");
  }
};

export default protect;
