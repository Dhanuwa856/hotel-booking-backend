import Category from "../models/category.js";

// Create a new category

export const crateCategory = async (req, res) => {
  const user = req.user;

  if (user == null) {
    res.status(403).json({
      message: "Please Loging",
    });
    return;
  }
  if (user?.type != "admin") {
    res.status(403).json({
      message: "You do not have permission to crate a category",
    });
    return;
  }
  const { name, description, amenities, price, createdAt } = req.body.category;

  try {
    const newCategory = new Category({
      name,
      description,
      amenities,
      price,
      createdAt,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get all categorys
export const getcategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
