import { User } from "../models/User.model.js";
import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const getProject = asyncHandler(async (req, res) => {
  //
});
const createProject = asyncHandler(async (req, res) => {
  //
});
const updateProject = asyncHandler(async (req, res) => {
  //
});
const deleteProject = asyncHandler(async (req, res) => {
  //
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
