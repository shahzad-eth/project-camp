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
  //
});
const createTask = asyncHandler(async (req, res) => {
  //
});
const getTaskById = asyncHandler(async (req, res) => {
  //
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
