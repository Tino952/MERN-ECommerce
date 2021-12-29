import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@proshop.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "Shopper1",
    email: "shopper1@proshop.com",
    password: bcrypt.hashSync("123456"),
  },
  {
    name: "Shopper2",
    email: "shopper2@proshop.com",
    password: bcrypt.hashSync("123456"),
  },
];

export default users;
