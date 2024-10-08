import express from "express";
import {
  createGalleryItem,
  getGalleryItems,
} from "../controllers/galleryItemController.js";

const galleryItemRouter = express.Router();

galleryItemRouter.get("/", getGalleryItems);
galleryItemRouter.post("/", createGalleryItem);

export default galleryItemRouter;
