const jwt = require("jsonwebtoken");
import { AuthenticationError } from "apollo-server-express";
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
