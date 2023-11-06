export const getNotesStart = () => ({
    type: "GET_NOTES_START"
})

export const getNotesSuccess = (note) => ({
    type: "GET_NOTES_SUCCESS",
    payload: note
})

export const getNotesFailure = () => ({
    type: "GET_NOTES_FAILURE"
})

// create Note
export const createNoteStart = () => ({
    type: "CREATE_NOTE_START"
})

export const createNoteSuccess = (note) => ({
    type: "CREATE_NOTE_SUCCESS",
    payload: note
})

export const createNoteFailure = () => ({
    type: "CREATE_NOTE_FAILURE"
})

//update
export const updateNoteStart = () => ({
    type: "UPDATE_NOTE_START"
})

export const updateNoteSuccess = (note) => ({
    type: "UPDATE_NOTE_SUCCESS",
    payload: note
})

export const updateNoteFailure = () => ({
    type: "UPDATE_NOTE_FAILURE"
})

// delete Note 
export const deleteNoteStart = () => ({
    type: "DELETE_NOTE_START"
})

export const deleteNoteSuccess = (NoteID) => ({
    type: "DELETE_NOTE_SUCCESS",
    payload: NoteID
})

export const deleteNoteFailure = () => ({
    type: "DELETE_NOTE_FAILURE"
})
