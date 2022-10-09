import express from "express";
import {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";
const router = express.Router();
router.route("/").get(getGoal).post(setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);
// const { protect } = require("../middleware/authMiddleware");

// router.route("/").get(protect, getGoals).post(protect, setGoal);
// router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

export default router;
