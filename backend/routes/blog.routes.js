import express from "express";
import {
  createBlogs,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog.controllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createBlogs);
router.get("/", verifyToken, getAllBlogs);
router.get("/:id", verifyToken, getBlogById);
export default router;