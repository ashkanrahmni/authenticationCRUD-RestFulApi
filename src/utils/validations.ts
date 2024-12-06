import Joi from "joi";

export const registerValidation = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username cannot be empty",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
    }),
  });

export const editUserValidation = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username cannot be empty",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  });  

export const loginValidation = Joi.object({
  username: Joi.string().required().messages({
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required",
  }),
});
