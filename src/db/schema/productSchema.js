"use strict";
const mongoose = require("mongoose");
exports.productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  brand: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  variants: {
    type: Array,
  },
});
