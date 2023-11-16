import axios from "axios";
import {
  login_fail,
  login_start,
  login_success,
  logout,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserAction";
import { baseUrl } from "../../App";

export const login_user = async (user, dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(login_start);
    try {
      await axios.post(baseUrl + "user/login", user).then((res) => {
        dispatch(login_success(res.data));
        resolve(res.data);
      }).catch(err => {reject(err)});
    } catch (err) {
      dispatch(login_fail);
      reject(err);
    }
  });
};

export const Logout = (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(logout());
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUser = async (user, dispatch, noteId = null) => {
  return new Promise(async (resolve, reject) => {
    dispatch(updateUserStart());
    try {
      let user_notes;
      user_notes = noteId === null ? user.notes : [...user.notes, noteId];
      const { accesstoken, ...user_info } = user;
      user_info.notes = user_notes;
      await axios.put(baseUrl + "auth/" + user._id, user_info, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      }).then((res) => {
        const updatedUser = { ...res.data, accesstoken: accesstoken };
        dispatch(updateUserSuccess(updatedUser));
        resolve(updatedUser);
      }).catch(err => reject(err));
    } catch (err) {
      dispatch(updateUserFailure());
      reject(err);
    }
  });
};

export const updateNoteUser = (user, dispatch, noteId = null) => {
  return new Promise(async (resolve, reject) => {
    dispatch(updateUserStart());
    try {
      const user_notes = user.notes.filter((note_id) => {
        return note_id !== noteId ? note_id : null;
      });
      const { accesstoken, ...user_info } = user;
      user_info.notes = user_notes;
      await axios.put(baseUrl + "auth/" + user._id, user_info, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      }).then((res) => {
        const updatedUser = { ...res.data, accesstoken: accesstoken };
        dispatch(updateUserSuccess(updatedUser));
        resolve(updatedUser);
      }).catch(err => reject(err));
    } catch (err) {
      dispatch(updateUserFailure());
      reject(err);
    }
  });
};
