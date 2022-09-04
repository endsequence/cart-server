require("dotenv").config();
export const PORT = 8080;
export const environment = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: "mongodb://localhost:27017/cart-db",
    jwtSecret: process.env.JWT_SECRET
  },
};
