import { body } from "express-validator";
import { AvailableUser } from "../utils/constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is Required")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 char"),
    body("password").trim().notEmpty().withMessage("Password is Required"),
    body("fullName").optional().trim(),
  ];
};

const userLoginvalidator = () => {
  return [
    body("email").trim().isEmail().withMessage("Email is Invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("old Password is required"),
    body("newPassword").notEmpty().withMessage("new Password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is Invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("old Password is required"),
  ];
};

const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional(),
  ];
};
const addMemberToProjectValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is required"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUser)
      .withMessage("Role is invalid"),
  ];
};

export {
  userRegisterValidator,
  userLoginvalidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  // project validators
  createProjectValidator,
  addMemberToProjectValidator,
};
