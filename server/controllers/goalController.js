import asyncHandler from "express-async-handler";
import Goal from "../model/goalModel.js";
import User from "../model/userModel.js";
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
// @desc    Set goals
// @route   POST /api/goals
// @access  Private

export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (goal.user.toString() !== user.id) {
    // Make sure the logged in user matches the goal user
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
    const user = await User.findById(req.user.id);
    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    if (goal.user.toString() !== user.id) {
      // Make sure the logged in user matches the goal user
      res.status(401);
      throw new Error("User not authorized");
    }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
