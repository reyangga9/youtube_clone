import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Test");
});
// Create A User
router.post("/signup", signup);
// Sign in
router.post("/signin", signin);
router.post("/signout", signout);

// Google Authentication
router.post("/google");

export default router;
