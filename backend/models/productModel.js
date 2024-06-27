Schema.Types.ObjectId;
import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      dafault: 0,
    },
    quantity: {
      type: Number,
      dafault: 0,
    },
    minimumQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      categoryId: {
        type: String,
        ref: "Category",
      },
      categoryName: {
        type: String,
      },
    },
    subProducts: [
      {
        subproduct: {
          type: Schema.Types.ObjectId,
          ref: "SubProduct",
          required:true
        },
        quantity: {
          type: Number,
          required: true,
          
        },
      },
    ],
    stock: [
      {
        franchiseId: {
          type: Schema.Types.ObjectId,
          ref: "Franchise",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      dafault: 0,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
