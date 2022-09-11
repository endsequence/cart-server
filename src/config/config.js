require("dotenv").config();
const servicePort = 7500;
exports.PORT = servicePort;
exports.environment = {
  development: {
    serverURL: `http://localhost:${servicePort}/`,
    dbString: "mongodb://mongo:27017/cart-db",
    // dbString: "mongodb://localhost:27017/cart-db",
    jwtSecret: process.env.JWT_SECRET,
  },
};
