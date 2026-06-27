import { User } from "../models/User.model.js";
import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";

const getProject = asyncHandler(async (req, res) => {
  //
});

const getProjectById = asyncHandler(async (req, res) => {
  //
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const project = await Project.create({
    name,
    description,
    // req.user._id give id in a string format
    // use ObjectId from mongoose to make sure it's mongoDB objectID
    createdBy: new mongoose.Types.ObjectId(req.user._id)
  })

  // updating the member in the same project

  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN
  })

  return res
    .status(201)
    .json(
      new ApiResponse(201, project, "Project Created Successfully")
    )
});
const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body
  const projectId = req.params

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description
    }, {
    returnDocument: "after"
  }
  )

  if (!projectId) {
    throw new ApiError(404, "Project not found")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        project,
        "Project Updated Succesfully"
      )
    )
});
const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params

  await Project.findByIdAndDelete(projectId)

  if (!projectId) {
    throw new ApiError(404, "Project Not Found")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, {}, "Project Deleted Successfully"
      )
    )
});
const addMembersToProject = asyncHandler(async (req, res) => {
  //
});
const getProjectMembers = asyncHandler(async (req, res) => {
  //
});
const updateMemberRole = asyncHandler(async (req, res) => {
  //
});
const deleteMember = asyncHandler(async (req, res) => {
  //
});

export {
  getProject,
  createProject,
  updateMemberRole,
  deleteMember,
  addMembersToProject,
  getProjectMembers,
  updateMemberRole,
  deleteMember,
};
