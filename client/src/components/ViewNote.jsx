import React from 'react'
import { useLocation } from 'react-router-dom'

function ViewNote() {
    const note = useLocation().state.note;
    console.log(note)

  return (
    <div>
      
    </div>
  )
}

export default ViewNote
