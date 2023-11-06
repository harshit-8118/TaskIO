import React, { useContext, useReducer } from 'react'
import { NotesReducer } from './NotesReducer';


const initialNotes = {
    notes: [],
    isFetching: false,
    error: false
}

export const NotesContext = useContext(initialNotes);


function NotesContextProvider({ children }) {
    const [state, dispatch] = useReducer(NotesReducer, initialNotes);
  return (
    <NotesContext.Provider 
    value={{
        notes: state.notes,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
    }}
    >
        {children}
    </NotesContext.Provider>
  )
}

export default NotesContext
