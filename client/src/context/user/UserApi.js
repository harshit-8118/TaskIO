import axios from "axios";
import { login_fail, login_start, login_success, logout, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserAction";
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

export const updateUser = async (user, dispatch, noteId = null) => {
  dispatch(updateUserStart());
  try {
    const user_notes = [...user.notes, noteId];
    const {accesstoken, ...user_info} = user;
    user_info.notes = user_notes;
    const res = await axios.put(
      baseUrl + "auth/" + user._id,
      user_info,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      }
    );
    const updatedUser = {...res.data, accesstoken:accesstoken};
    dispatch(updateUserSuccess(updatedUser));
  }catch(err){
    console.log(err)
    dispatch(updateUserFailure())
  }
};

export const updateNoteUser = async (user, dispatch, noteId = null) => {
  dispatch(updateUserStart());
  try {
    const user_notes = user.notes.filter(note_id => {return (note_id != noteId)?note_id:null});
    const {accesstoken, ...user_info} = user;
    user_info.notes = user_notes;
    const res = await axios.put(
      baseUrl + "auth/" + user._id,
      user_info,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      }
    );
    const updatedUser = {...res.data, accesstoken:accesstoken};
    dispatch(updateUserSuccess(updatedUser));
  }catch(err){
    console.log(err)
    dispatch(updateUserFailure())
  }
};
