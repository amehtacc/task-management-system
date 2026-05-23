import Task from "../models/task.model.js";

import Activity from "../models/activity.model.js";

export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description
    } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id
    });

    await Activity.create({
      user: req.user.id,

      action: "TASK_CREATED",

      details: `Task "${title}" created`
    });

    res.status(201).json({
      success: true,
      message:
        "Task created successfully",
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const getOwnTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.id
    }).sort({
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

export const updateTask = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const task =
      await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    if (
      task.createdBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized access"
      });
    }

    const updatedTask =
      await Task.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true
        }
      );

    await Activity.create({
      user: req.user.id,

      action: "TASK_UPDATED",

      details: `Task "${updatedTask.title}" updated`
    });

    res.status(200).json({
      success: true,
      message:
        "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

export const deleteTask = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const task =
      await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    const isAdmin =
      req.user.role === "admin";

    const isOwner =
      task.createdBy.toString() ===
      req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized access"
      });
    }

    await Task.findByIdAndDelete(id);

    await Activity.create({
      user: req.user.id,

      action: "TASK_DELETED",

      details: `Task "${task.title}" deleted`
    });

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};