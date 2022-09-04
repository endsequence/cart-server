const jwt = require("jsonwebtoken");
import { AuthenticationError } from "apollo-server-express";
const { environment } = require("../config/config");
const env = process.env.NODE_ENV || "development";

const verifyJwt = (jwtToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, environment[env].jwtSecret, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

exports.reqContext = async ({ req }) => {
  if (!req.headers.authorization)
    throw new AuthenticationError(`AUTH TOKEN not received`);

  const values = req.headers.authorization.split(" ");
  let verified = null;

  try {
    verified = await verifyJwt(values[1]);
  } catch (err) {
    console.log(err);
    throw new AuthenticationError(`INVALID_TOKEN`);
  }

  return {
    tenantid: 12,
    permissions: "some",
    verified
  };
};
