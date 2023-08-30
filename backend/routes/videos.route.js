import express from "express";
// import { test } from "../controllers/video.controller.js";
const router = express.Router();
import { verifyToken } from "../verifyToken.js";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../controllers/video.controller.js";

// Create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", verifyToken, getVideo);
export default router;
