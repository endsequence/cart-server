"use strict";
const mongoose = require("mongoose");
exports.cartSchema = new mongoose.Schema({
  customerId: {
    type: String,
  },
  products: {
    type: Array,
  },
  // active: {
  //   type: Boolean,
  // },
});
