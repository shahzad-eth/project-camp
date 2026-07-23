import { User } from "../models/User.model.js";
import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { SubTask } from "../models/subtask.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  const tasks = await Task.find({
    project: mongoose.Types.ObjectId(projectId),
  }).populate("assignedTo", "avatar username email fullName");

  return res
    .status(200)
    .json(new ApiResponse(200, { tasks }, "Task fetched sucessfully"));
});
const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project Not found");
  }

  const files = req.files;

  const attachments = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/public/images/${file.originalname}`,
      mimeType: file.mimetype,
      size: file.size,
    };
  });

  const task = await Task.create({
    title,
    description,
    project: mongoose.Types.ObjectId(projectId),
    assignedTo: mongoose.Types.ObjectId(assignedTo),
    assignedBy: mongoose.Types.ObjectId(req.user_id),
    status,
    attachments,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { task }, "Task created sucessfully"));
});
const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(taskId),
      },
    },
    {
      // assignedTo lookup
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
      },
      // filter data
      pipeline: [
        {
          $project: {
            _id: 1,
            username: 1,
            fullName: 1,
            avatar: 1,
          },
        },
      ],
    },
    {
      $lookup: {
        // subtask lookup
        from: "subtasks",
        localField: "_id",
        foreignField: "task",
        as: "subtasks",
      },
      pipeline: [
        // subtask createdBy/User lookup
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
          pipeline: [
            {
              $project: {
                _id: 1,
                username: 1,
                fullName: 1,
                avatar: 1,
              },
            },
          ],
        },
        {
          addFields: {
            createdBy: {
              $arrayElemAt: ["$createdBy", 0],
            },
          },
        },
      ],
    },
    {
      $addFields: {
        assignedTo: {
          $arrayElemAt: ["assignedTo", 0],
        },
      },
    },
  ]);
});
const updateTask = asyncHandler(async (req, res) => {
  //
});
const deleteTask = asyncHandler(async (req, res) => {
  //
});
const createSubTask = asyncHandler(async (req, res) => {
  //
});
const updateSubTask = asyncHandler(async (req, res) => {
  //
});
const deleteSubTask = asyncHandler(async (req, res) => {
  //
});

export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
};
