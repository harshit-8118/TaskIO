import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import { NotesContext } from '../context/notes/NotesContext';

function AllNotes() {
    const {notes} = useContext(NotesContext);
    console.log(
        notes
    )
  return ( 
    <div>
        <Navbar />
        {
            notes.map(note => (note._id + "\n" + note.title))
        }
    </div>
  )
}

export default AllNotes
