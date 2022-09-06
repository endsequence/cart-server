import { gql } from "apollo-server-express";

export const typeDefs = gql`

  type Cart {
    id: ID
    customerId: String
    products: [CartProduct]
    active: Boolean
    token: String
  }

  type CartProduct {
    title: String
    sku: String
    variant: String
    thumbnail: String
    qty: Int
  }

  input CartInput {
    sku: String
    variant: String
    qty: Int
  }

  type Product {
    id: ID
    title: String
    description: String
    price: Int
    brand: String
    thumbnail: String
    variants: [Variant]
  }

  type Variant {
    id: String
    qty: Int
  }

  type Query {
    getProducts: [Product]
    findAProduct(id: String): Product
    findCart: Cart
  }

  type Mutation {
    addProductToCart(cart: CartInput): Cart
  }
`;
