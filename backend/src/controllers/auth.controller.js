import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import Activity from "../models/activity.model.js";

import { generateToken } from "../utils/jwt.js";

export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials"
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        success: false,
        message:
          "Account is inactive"
      });
    }

    const isPasswordMatched =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials"
      });
    }

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });

    await Activity.create({
      user: user._id,

      action: "LOGIN",

      details: `${user.name} logged in`
    });

    res.status(200).json({
      success: true,
      message:
        "Login successful",

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const logoutUser = async (
  req,
  res
) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });

  res.status(200).json({
    success: true,
    message:
      "Logout successful"
  });
};

export const getCurrentUser =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Internal Server Error"
      });
    }
  };