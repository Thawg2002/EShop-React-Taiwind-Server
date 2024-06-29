import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    selled: {
      type: Number,
      default: 0,
    },
    gallery: {
      type: Array,
    },
    // quanlity: {
    //   type: Number,
    // },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
