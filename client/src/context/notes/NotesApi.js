import axios from "axios";
import { baseUrl } from "../../App";
import {
  cleanNotesOnLogout,
  createNoteFailure,
  createNoteStart,
  createNoteSuccess,
  deleteNoteFailure,
  deleteNoteStart,
  deleteNoteSuccess,
  getNotesFailure,
  getNotesStart,
  getNotesSuccess,
  setInitialNotesFailure,
  setInitialNotesStart,
  setInitialNotesSuccess,
  updateNoteFailure,
  updateNoteStart,
  updateNoteSuccess,
} from "./NotesAction";
import { useContext } from "react";
import { AuthContext } from "../user/UserContext";
import { updateNoteUser, updateUser } from "../user/UserApi";

export const setInitialNotes = async (noteId, dispatch) => {
  dispatch(setInitialNotesStart());
  try {
    const res = await axios.get(baseUrl + `notes/find/${noteId}`);
    dispatch(setInitialNotesSuccess(res.data));
  } catch (err) {
    dispatch(setInitialNotesFailure());
  }
};

export const cleanNoteOnLogout = async (dispatch) => {
  dispatch(cleanNotesOnLogout());
};

export const getNotes = async (userID, dispatch) => {
  dispatch(getNotesStart());
  try {
    const res = await axios.get(baseUrl + `notes/user/${userID}`);
    dispatch(getNotesSuccess(res.data));
  } catch (err) {
    dispatch(getNotesFailure());
  }
};

//create
export const createNote = async (note, user, dispatch, userDispatch) => {
  dispatch(createNoteStart());
  try {
    const res = await axios.post(baseUrl + `notes/register`, note);
    dispatch(createNoteSuccess(res.data));
    updateUser(user, userDispatch, res.data._id);
  } catch (err) {
    console.log(err);
    dispatch(createNoteFailure());
  }
};

// update
export const updateNote = async (note, dispatch) => {
  dispatch(updateNoteStart());
  try {
    const res = await axios.put(baseUrl + `notes/${note._id}`, note);
    dispatch(updateNoteSuccess(res.data));
  } catch (err) {
    dispatch(updateNoteFailure());
  }
};
export const updateNoteDone = async (note, dispatch) => {
  dispatch(updateNoteStart());
  try {
    const res = await axios.put(baseUrl + `notes/markdone/${note._id}`, note);
    dispatch(updateNoteSuccess(res.data));
  } catch (err) {
    dispatch(updateNoteFailure());
  }
};
export const updateNoteImp = async (note, dispatch) => {
  dispatch(updateNoteStart());
  try {
    const res = await axios.put(baseUrl + `notes/markimp/${note._id}`, note);
    dispatch(updateNoteSuccess(res.data));
  } catch (err) {
    dispatch(updateNoteFailure());
  }
};

//delete
export const deleteNote = async (noteID, dispatch, user, userDispatch) => {
  dispatch(deleteNoteStart());
  try {
    await axios.delete(baseUrl + `notes/${noteID}`);
    dispatch(deleteNoteSuccess(noteID));
    updateNoteUser(user, userDispatch, noteID);
  } catch (err) {
    dispatch(deleteNoteFailure());
  }
};
