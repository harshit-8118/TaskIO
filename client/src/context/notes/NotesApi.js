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
import { updateNoteUser, updateUser } from "../user/UserApi";

export const setInitialNotes = (noteId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(setInitialNotesStart());
    try {
      await axios
        .get(baseUrl + `notes/find/${noteId}`)
        .then((res) => {
          dispatch(setInitialNotesSuccess(res.data));
          resolve(res.data);
        })
        .catch((err) => {reject(err)});
    } catch (err) {
      dispatch(setInitialNotesFailure());
      reject(err);
    }
  });
};

export const cleanNoteOnLogout = (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(cleanNotesOnLogout());
    resolve();
  });
};

export const getNotes = (userID, dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(getNotesStart());
    try {
      await axios.get(baseUrl + `notes/user/${userID}`).then((res) => {
        dispatch(getNotesSuccess(res.data));
        resolve(res.data);
      }).catch(err=>{reject(err)});
    } catch (err) {
      dispatch(getNotesFailure());
      reject(err);
    }
  });
};

export const createNote = (note, user, dispatch, userDispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(createNoteStart());
    try {
      await axios.post(baseUrl + `notes/register`, note).then(resp => {
        updateUser(user, userDispatch, resp.data._id).then((res) => {
          dispatch(createNoteSuccess(resp.data));
          resolve(resp.data)
        }).catch(err => {
          deleteNote(resp.data._id, dispatch, user, userDispatch);  
          reject(err);
        });
      }).catch(err=>{reject(err)});
    } catch (err) {
      dispatch(createNoteFailure());
      reject(err);
    }
  });
};

export const updateNote = (note, dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(updateNoteStart());
    try {
      await axios.put(baseUrl + `notes/${note._id}`, note).then(res => {
        dispatch(updateNoteSuccess(res.data));
        resolve(res.data);
      }).catch(err=>{reject(err)});
    } catch (err) {
      dispatch(updateNoteFailure());
      reject(err);
    }
  });
};

export const updateNoteDone = (note, dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(updateNoteStart());
    try {
      await axios.put(baseUrl + `notes/markdone/${note._id}`, note).then(res => {
        dispatch(updateNoteSuccess(res.data));
        resolve(res.data);
      }).catch(err=>{reject(err)});
    } catch (err) {
      dispatch(updateNoteFailure());
      reject(err);
    }
  });
};

export const updateNoteImp = (note, dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(updateNoteStart());
    try {
      await axios.put(baseUrl + `notes/markimp/${note._id}`, note).then(res => {
        dispatch(updateNoteSuccess(res.data));
        resolve(res.data);
      }).catch(err=>{reject(err)});
    } catch (err) {
      dispatch(updateNoteFailure());
      reject(err);
    }
  });
};

export const deleteNote = (noteID, dispatch, user, userDispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(deleteNoteStart());
    try {
      updateNoteUser(user, userDispatch, noteID)
        .then(async () => {
          await axios.delete(baseUrl + `notes/${noteID}`).then(res => {
            dispatch(deleteNoteSuccess(noteID));
            resolve();
          }).catch(err=>{reject(err)});
        })
        .catch((err) => {
          dispatch(deleteNoteFailure());
          reject(err);
        });
    } catch (err) {
      dispatch(deleteNoteFailure());
      reject(err);
    }
  });
};
