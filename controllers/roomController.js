import Room from "../models/room.js";
import Category from "../models/category.js";

// get all rooms

export async function getRooms(req, res) {
  try {
    const rooms = await Room.find().populate("category");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// create room

export async function crateRoom(req, res) {
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
  const { name, price, image, description, category, maxGuests, disabled } =
    req.body.room;

  try {
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: "Category not found" });
    }
    // Create new room
    const newRoom = new Room({
      name,
      price,
      image,
      description,
      category, // This is the ObjectId from the Category model
      maxGuests,
      disabled: disabled || false, // default to false if not provided
    });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
