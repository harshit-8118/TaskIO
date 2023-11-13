import React, { useContext, useEffect, useState } from "react";
import "./notes.scss";
import GiveSelectedNotes from "./GiveSelectedNotes";
function Notes() {
  const [notesMark, setNotesMark] = useState({});
  useEffect(() => {
    setNotesMark({
      important: -1,
      done: -1,
    });
  }, []);
  const handleChangeImportant = (e) => {
    setNotesMark({ ...notesMark, important: Number(e.target.value) });
  };
  const handleChangeDone = (e) => {
    setNotesMark({ ...notesMark, done: Number(e.target.value) });
  };
  return (
    <div className="notes">
      <div className="select-box-outer">
        <div className="select-box-inner">
          <span>Important: </span>
          <select onChange={handleChangeImportant} value={notesMark.important}>
            <option value={-1}></option>
            <option value={1}>important</option>
            <option value={0}>Not important</option>
          </select>
        </div>
        <div className="select-box-inner">
          <span>Done: </span>
          <select onChange={handleChangeDone} value={notesMark.done}>
            <option value={-1}></option>
            <option value={1}>Completed</option>
            <option value={0}>Incomplete</option>
          </select>
        </div>
      </div>
      <GiveSelectedNotes notesMark={notesMark} />
    </div>
  );
}

export default Notes;
