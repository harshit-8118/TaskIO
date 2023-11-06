import axios from 'axios';
import {baseUrl} from '../../App';
import { createNoteFailure, createNoteStart, createNoteSuccess, deleteNoteFailure, deleteNoteStart, deleteNoteSuccess, getNotesFailure, getNotesStart, getNotesSuccess, updateNoteFailure, updateNoteStart, updateNoteSuccess } from './NotesAction';

export const getNotes = async (userID, dispatch) => {
    dispatch(getNotesStart());
    try{
        const res = await axios.get(baseUrl + `notes/user/${userID}`);
        dispatch(getNotesSuccess(res.data));
    }catch(err){
        dispatch(getNotesFailure());
    }
}

//create
export const createNote = async (note, dispatch) => {
    dispatch(createNoteStart());
    try{
        const res = await axios.post(baseUrl + `notes/register`, note);
        dispatch(createNoteSuccess(res.data));
    }catch(err){
        dispatch(createNoteFailure());
    }
}

// update
export const updateNote = async (note, dispatch) => {
    dispatch(updateNoteStart());
    try{
        const res = await axios.put(baseUrl + `notes/${note._id}`, note);
        dispatch(updateNoteSuccess(res.data));
    }catch(err){
        dispatch(updateNoteFailure());
    }
}
export const updateNoteDone = async (note, dispatch) => {
    dispatch(updateNoteStart());
    try{
        const res = await axios.put(baseUrl + `notes/markdone/${note._id}`, note);
        dispatch(updateNoteSuccess(res.data));
    }catch(err){
        dispatch(updateNoteFailure());
    }
}
export const updateNoteImp = async (note, dispatch) => {
    dispatch(updateNoteStart());
    try{
        const res = await axios.put(baseUrl + `notes/markimp/${note._id}`, note);
        dispatch(updateNoteSuccess(res.data));
    }catch(err){
        dispatch(updateNoteFailure());
    }
}

//delete
export const deleteNote = async (noteID, dispatch) => {
    dispatch(deleteNoteStart());
    try{
        await axios.delete(baseUrl + `notes/${noteID}`);
        dispatch(deleteNoteSuccess(noteID));
    }catch(err){
        dispatch(deleteNoteFailure());
    }
}