import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import adminMiddleware from "../middlewares/admin.middleware.js";

import {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllTasks,
  getActivityLogs,
  getDashboardAnalytics
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.use(adminMiddleware);

router.get(
  "/users",
  getAllUsers
);

router.patch(
  "/users/:id/status",
  updateUserStatus
);

router.delete(
  "/users/:id",
  deleteUser
);

router.get(
  "/tasks",
  getAllTasks
);

router.get(
  "/activities",
  getActivityLogs
);

router.get(
  "/analytics",
  getDashboardAnalytics
);

export default router;