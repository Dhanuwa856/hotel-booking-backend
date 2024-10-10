import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890DP", 12);

const roomSchema = mongoose.Schema({
  room_id: {
    type: String,
    default: () => nanoid(),
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false, // Indicates whether the room is disabled
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category01",
    required: true,
  },
  maxGuests: {
    type: Number, // Maximum number of guests allowed in the room
    required: true,
  },
});

const Room = mongoose.model("Room01", roomSchema);

export default Room;
