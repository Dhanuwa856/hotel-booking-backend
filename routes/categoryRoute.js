import express from "express";
import {
  crateCategory,
  getcategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getcategory);
categoryRouter.post("/", crateCategory);

export default categoryRouter;
