import express from "express";
import { crateRoom, getRooms } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.get("/", getRooms);
roomRouter.post("/", crateRoom);

export default roomRouter;
