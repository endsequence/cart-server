"use strict";
const mongoose = require("mongoose");
exports.productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sku: {
    type: String,
  },
  variant: {
    type: String,
  },
  images: {
    type: Array,
  },
});
