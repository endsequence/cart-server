import { Products } from "../db/connection.js";

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
    addProduct: (root, { product }) => {
      const { ...rest } = product;
      const newProduct = new Products({ ...rest });

      return new Promise((resolve, reject) => {
        newProduct.save((err, product) => {
          if (err) reject(err);
          else resolve(product);
        });
      });
    },
  },
};
