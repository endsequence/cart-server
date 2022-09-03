const mongoose = require("mongoose");
const { environment } = require("../config/config");
const { productSchema } = require("./schema/productSchema.js");
const env = process.env.NODE_ENV || "development";

mongoose.connect(environment[env].dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", () => {
  console.error("Error while connecting to DB");
});

const Products = mongoose.model("Products", productSchema);

export { Products };
