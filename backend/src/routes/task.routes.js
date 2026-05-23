import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createTask,
  getOwnTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  createTask
);

router.get(
  "/my-tasks",
  getOwnTasks
);

router.put(
  "/:id",
  updateTask
);

router.delete(
  "/:id",
  deleteTask
);

export default router;