import { ObjectId } from "mongodb";
import { Products, Carts } from "../db/connection.js";
import { createJwt } from "../utils/index";
import {
  addProductToCartResolver,
  getCartResolver,
} from "./resolvers/cart.resolvers.js";

export const resolvers = {
  Query: {
    getProducts: (root, args, context) => {
      console.log({ context });
      return new Promise((resolve, reject) => {
        Products.find((err, products) => {
          if (err) reject(err);
          else resolve(products);
        });
      });
    },
    findCart: (root, args, context) => {
      console.log({ context });
      return getCartResolver({ context });
    },
    findAProduct: (root, { id }, context) => {
      return new Promise((resolve, reject) => {
        Products.findOne({ _id: id }, (err, product) => {
          if (err) reject(err);
          else resolve(product);
        });
      });
    },
  },
  Mutation: {
    addProductToCart: (root, { cart }, context) => {
      console.log({ context });
      return addProductToCartResolver({ context, cartReq: cart });
    },
  },
};
