import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/logout",
  logoutUser
);

export default router;