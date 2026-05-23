import User from "../models/user.model.js";

import Task from "../models/task.model.js";

import Activity from "../models/activity.model.js";

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const updateUserStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const user =
        await User.findByIdAndUpdate(
          id,
          {
            status
          },
          {
            new: true
          }
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,

        message:
          "User status updated successfully",

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

export const deleteUser = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const user =
      await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await User.findByIdAndDelete(id);

    await Task.deleteMany({
      createdBy: id
    });

    res.status(200).json({
      success: true,
      message:
        "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const getAllTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.find()
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const getActivityLogs =
  async (req, res) => {
    try {
      const logs =
        await Activity.find()
          .populate(
            "user",
            "name email role"
          )
          .sort({
            createdAt: -1
          });

      res.status(200).json({
        success: true,
        data: logs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Internal Server Error"
      });
    }
  };

export const getDashboardAnalytics =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalTasks =
        await Task.countDocuments();

      const completedTasks =
        await Task.countDocuments({
          status: "completed"
        });

      const pendingTasks =
        await Task.countDocuments({
          status: "pending"
        });

      res.status(200).json({
        success: true,

        data: {
          totalUsers,
          totalTasks,
          completedTasks,
          pendingTasks
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