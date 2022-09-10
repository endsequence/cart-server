import { ObjectId } from "mongodb";
import { Carts } from "../../db/connection.js";
import {
  createJwt,
  lookupProductVariant,
  stripCartObject,
} from "../../utils/index";

const tokenizedCart = (cart) => {
  const token = createJwt(cart.customerId, cart.id);
  cart.token = token;
  return cart;
};

const getCartResolver = async ({ context }) => {
  const { customerId, cartId, expired } = context;
  let cart = await Carts.findOne({ _id: ObjectId(cartId) });

  if (!cart) return null;
  if (expired) stripCartObject(cart, new ObjectId());

  await cart.save();
  return tokenizedCart(cart);
};

const addProductToCartResolver = async ({ context, cartReq }) => {
  const { customerId, cartId, expired } = context;
  const product = await lookupProductVariant(cartReq);
  if (!product) throw new Error("Product not found!");
  const variant = product.variants.find((el) => el.id === cartReq.variant);
  console.log({ product, variant });
  if (variant.qty < cartReq.qty)
    throw new Error("Product inventory not available!");

  const newCustomerId = new ObjectId();
  let cart = await Carts.findOne({ _id: ObjectId(cartId) });
  if (cart) {
    if (expired) stripCartObject(cart, newCustomerId);
  } else {
    cart = new Carts({
      customerId: newCustomerId,
      products: [],
      active: true,
    });
  }
  cart.products.push({
    sku: cartReq.sku,
    variant: cartReq.variant,
    qty: cartReq.qty,
    title: product.title,
    thumbnail: product.thumbnail,
  });
  await cart.save();
  return tokenizedCart(cart);
};

module.exports = {
  addProductToCartResolver,
  getCartResolver,
};
