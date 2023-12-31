import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string()
    .min(3, "too short...")
    .required("field can't be empty"),
  password: Yup.string().required("Enter your password"),
});

export const commentSchema = Yup.object({
  comment_text: Yup.string()
    .min(10, "too short...")
    .required("field can't be empty"),
});

export const registerSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const userUpdationSchema = Yup.object({
  fname: Yup.string().min(2).max(50).nullable(true),
  lname: Yup.string().min(2).max(50).nullable(true),
  mobile: Yup.mixed()
    .test("is-valid-number", "Invalid contact number.", (value) => {
      if (!value) {
        return true;
      }
      return typeof value === "number" || /^[0-9]+$/.test(value);
    })
    .test("is-valid-length", "Contact number must be 10 digits.", (value) => {
      if (!value) {
        return true;
      }
      return value.toString().length === 10;
    })
    .nullable(true),
  age: Yup.number().min(12).max(100).nullable(true),
});
export const taskSchema = Yup.object({
  title: Yup.string().min(3).required("field can't be empty"),
});
