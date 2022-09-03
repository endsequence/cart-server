import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
