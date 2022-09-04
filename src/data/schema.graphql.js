import { gql } from "apollo-server-express";

export const typeDefs = gql`

  type Cart {
    id: ID
    customerId: String
    products: [CartProduct]
  }

  type CartProduct {
    name: String
    sku: String
    variant: String
    images: [Image]
    qty: Int
  }

  input CartInput {
    sku: String
    variant: String
    qty: Int
  }

  type Product {
    id: ID
    name: String
    sku: String
    variant: String
    images: [Image]
  }

  type Image {
    type: String
    url: String
  }

  input ProductInput {
    name: String
    sku: String
    variant: String
    images: [ImageInput]
  }

  input ImageInput {
    type: String
    url: String
  }

  type Query {
    getProducts: [Product]
    findAProduct(id: String): Product
  }

  type Mutation {
    addProduct(product: ProductInput): Product
  }
`;
