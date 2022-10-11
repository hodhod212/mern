import express from "express";
import {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getGoal).post(protect, setGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

export default router;
