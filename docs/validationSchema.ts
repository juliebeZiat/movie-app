import * as Yup from "yup";

export const signinValidationSchema = Yup.object({
  email: Yup.string()
    .email("Email must be an email")
    .required("Email should not be empty"),
  password: Yup.string()
    .required("Password should not be empty")
    .matches(/([0-9])/, "Password must contain at least one number")
    .matches(/([a-z])/, "Password must contain at least one lowercase letter")
    .matches(/([A-Z])/, "Password must contain at least one uppercase letter")
    .min(4, "Password must be longer than or equal to 4 characters"),
}).required();

export const signupValidationSchema = Yup.object({
  email: Yup.string()
    .email("Email must be an email")
    .required("Email should not be empty"),
  password: Yup.string()
    .required("Password should not be empty")
    .matches(/([0-9])/, "Password must contain at least one number")
    .matches(/([a-z])/, "Password must contain at least one lowercase letter")
    .matches(/([A-Z])/, "Password must contain at least one uppercase letter")
    .min(4, "Password must be longer than or equal to 4 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must be same"),
}).required();
