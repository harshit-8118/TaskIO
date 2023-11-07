import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string()
    .min(3, "too short...")
    .required("field can't be empty"),
  password: Yup.string().required("Enter your password"),
});

export const registerSchema = Yup.object({
  username: Yup.string().min(3).max(20).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
