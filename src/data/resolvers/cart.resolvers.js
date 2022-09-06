import { ObjectId } from "mongodb";
import { Carts, Products } from "../../db/connection.js";
import { createJwt } from "../../utils/index";

const getCartResolver = async ({ context }) => {
  return new Promise((resolve, reject) => {
    const { customerId, cartId, expired } = context;
    Carts.findOne({ _id: ObjectId(cartId) }, (err, cart) => {
      if (err) reject(err);
      else {
        if (cart) {
          if (expired) {
            const newCustomerId = new ObjectId();
            cart._id = new ObjectId();
            cart.isNew = true;
            cart.customerId = newCustomerId;
            cart.save((err, c) => {
              if (err) reject(err);
              else {
                const token = createJwt(newCustomerId, c.id);
                c.token = token;
                resolve(c);
              }
            });
          } else {
            const token = createJwt(customerId, cartId);
            cart.token = token;
            resolve(cart);
          }
        } else resolve(null);
      }
    });
  });
};

const addProductToCartResolver = async ({ context, cartReq }) => {
  return new Promise((resolve, reject) => {
    const { customerId, cartId, expired } = context;
    Carts.findOne({ _id: ObjectId(cartId) }, (err, cart) => {
      if (err) reject(err);
      else {
        const newCustomerId = new ObjectId();
        if (cart) {
          if (expired) {
            cart._id = new ObjectId();
            cart.isNew = true;
            cart.customerId = newCustomerId;
          }
          cart.products.push({
            sku: cartReq.sku,
            variant: cartReq.variant,
            qty: cartReq.qty,
          });
        } else {
          cart = new Carts({
            customerId: newCustomerId,
            products: [
              {
                sku: cartReq.sku,
                variant: cartReq.variant,
                qty: cartReq.qty,
              },
            ],
            active: true,
          });
        }
        cart.save((err, c) => {
          if (err) reject(err);
          else {
            const token = createJwt(expired ? newCustomerId : customerId, c.id);
            c.token = token;
            resolve(c);
          }
        });
      }
    });
  });
};

module.exports = {
  addProductToCartResolver,
  getCartResolver,
};
