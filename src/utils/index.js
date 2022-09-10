const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { Products } = require("../db/connection");
const moment = require("moment");
const { environment } = require("../config/config");
const env = process.env.NODE_ENV || "development";

exports.createJwt = (customerId, cartId) => {
  const token = jwt.sign({ customerId, cartId }, environment[env].jwtSecret, {
    expiresIn: "2m",
  });
  return token;
};

const verifyJwt = (jwtToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      jwtToken,
      environment[env].jwtSecret,
      { ignoreExpiration: true },
      function (err, decoded) {
        if (err) {
          reject(err);
        } else {
          const expired = moment().unix() > decoded.exp;
          resolve({ ...decoded, expired });
        }
      }
    );
  });
};

exports.reqContext = async ({ req }) => {
  // if (!req.headers.authorization)
  //   throw new AuthenticationError(`AUTH TOKEN not received`);
  if (!req.headers.authorization) return {};

  const values = req.headers.authorization.split(" ");
  try {
    return await verifyJwt(values[1]);
  } catch (err) {
    console.log(err);
    throw new AuthenticationError(`INVALID_TOKEN`);
  }
};

exports.lookupProductVariant = async (cartReq) => {
  return await Products.findOne({
    _id: cartReq.sku,
    "variants.id": cartReq.variant,
  });
};

exports.stripCartObject = (cart, newCustomerId) => {
  cart._id = undefined;
  cart.isNew = true;
  cart.active = true;
  cart.customerId = newCustomerId;
};
