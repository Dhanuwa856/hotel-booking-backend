import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Get all users
export async function getUsers(req, res) {
  console.log("This is a GET request");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new user
export async function postUsers(req, res) {
  console.log("This is a POST request");
  const user = req.body;
  const password = req.body.password;

  // Hash the user's password
  const passwordHash = bcrypt.hashSync(password, 10);
  user.password = passwordHash;

  try {
    const newUser = await new User(user).save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Update a user's data (PUT)
export async function putUsers(req, res) {
  console.log("This is a PUT request");

  const { email, firstName, lastName, phone, img } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { firstName, lastName, phone, img } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Partially update a user's firstName (PATCH)
export async function patchUsers(req, res) {
  try {
    console.log("Received request to update the firstName by email");

    const email = req.body.email;
    const { firstName } = req.body;

    // Validate that firstName is provided
    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    }

    // Find the user by email and update the firstName
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { firstName } },
      { new: true }
    );

    // If no user found with the provided email
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ message: "Server error while updating user" });
  }
}

// Delete a user by email
export async function deleteUsers(req, res) {
  try {
    console.log("Received request to delete a user by email");

    const email = req.body.email;

    // Find the user by email and delete
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Server error while deleting user" });
  }
}

// User login function
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Prepare JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
    };

    // Generate JWT token
    const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });

    // Respond with user data and token
    res.json({
      message: "User authenticated successfully",
      user,
      token,
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: "Server error while logging in" });
  }
}
