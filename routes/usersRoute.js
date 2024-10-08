import express from "express";
import {
  deleteUsers,
  getUsers,
  loginUser,
  patchUsers,
  postUsers,
  putUsers,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", postUsers);
userRouter.put("/", putUsers);
userRouter.patch("/", patchUsers);
userRouter.delete("/", deleteUsers);
userRouter.post("/login", loginUser);

export default userRouter;
