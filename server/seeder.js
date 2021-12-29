import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const initUsers = await User.insertMany(users);
    const adminUser = initUsers[0]._id;
    const initProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    const testProducts = products.map((product) => {
      return (product = { ...product, user: adminUser });
    });
    // initProducts and testProducts return same array

    await Product.insertMany(initProducts);

    console.log("Data successfully imported".green);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red);
    process.exit(1);
  }
};

const clearAllData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data successfully cleared".green);
    process.exit();
  } catch (error) {
    console.error(error.red);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? clearAllData() : importData();
