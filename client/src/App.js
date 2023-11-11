import { useContext, useEffect } from "react";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import { AuthContext } from "./context/user/UserContext";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Settings from "./components/Settings";
import AllNotes from "./components/AllNotes";
import { cleanNoteOnLogout, getNotes, setInitialNotes } from "./context/notes/NotesApi";
import { NotesContext } from "./context/notes/NotesContext";
import axios from "axios";
import ViewNote from "./components/ViewNote";

function App() {
  const { user } = useContext(AuthContext);
  const { notes, dispatch} = useContext(NotesContext);
  
  useEffect(() => {
    try{
      cleanNoteOnLogout(dispatch);
      user.notes.map((note_id) => {
        setInitialNotes(note_id, dispatch);
      });
    }catch(err){
    }
  }, [user])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="/settings" element={user ? <Settings /> : <Landing />} />
          <Route path="/allnotes" element={user ? <AllNotes /> : <Landing />} />
          <Route path="/view/:id" element={user ? <ViewNote /> : <Landing />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
export const baseUrl = "http://localhost:5500/api/";
