import axios from "axios";
import { login_fail, login_start, login_success, logout } from "./UserAction";
import { baseUrl } from "../../App";

export const login_user = async (user, dispatch) => {
  dispatch(login_start);
  try {
    const res = await axios.post(baseUrl + "user/login", user);
    dispatch(login_success(res.data));
  } catch (err) {
    dispatch(login_fail);
  }
};

export const Logout = (dispatch) => {
  dispatch(logout());
};
