import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String], // Corrected: amenities should be an array of strings
    required: false,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("category01", categorySchema); // Model name should match correctly

export default Category;
