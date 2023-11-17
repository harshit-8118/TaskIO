import { useContext, useEffect } from "react";
import Landing from "./pages/Landing/Landing";
import { AuthContext } from "./context/user/UserContext";
import Home from "./pages/Home/Home";
import "./GlobalCSS.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllNotes from "./components/AllNotes/AllNotes";
import { cleanNoteOnLogout, setInitialNotes } from "./context/notes/NotesApi";
import { NotesContext } from "./context/notes/NotesContext";
import Settings from "./components/Settings/Settings";
import ViewNote from "./components/ViewNote/ViewNote";
import EditNote from "./components/EditNote/EditNote";
// import ImpTasks from "./components/ImportantNotes/ImpTasks";
// import DoneTasks from "./components/CompletedNotes/DoneTasks";
import Navbar from "./components/Navbar/Navbar";
import Notes from "./components/Notes/Notes";
import ResetPass from "./pages/ResetPassword/ResetPass";

function App() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(NotesContext);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    try {
      cleanNoteOnLogout(dispatch);
      user.notes.forEach((note_id) => {
        setInitialNotes(note_id, dispatch).then(res=>{}).catch(err=>{});
      });
    } catch (err) {}
  }, [user, dispatch]);
  return (
    <div className="App" style={{position:"relative"}}>
      <Router>
        {user && <Navbar />}
        <div className="other">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Landing />} />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Landing />}
            />
            <Route
              path="/allnotes"
              element={user ? <AllNotes /> : <Landing />}
            />
            <Route path="/notes" element={user ? <Notes /> : <Landing />} />
            <Route path="/resetpass" element={ <ResetPass /> } />
            {/* <Route 
              path="/impnotes1"
              element={user ? <ImpTasks /> : <Landing />}
            />
            <Route
              path="/impnotes0"
              element={user ? <ImpTasks /> : <Landing />}
            />
            <Route path="/done1" element={user ? <DoneTasks /> : <Landing />} />
            <Route path="/done0" element={user ? <DoneTasks /> : <Landing />} /> */}
            <Route
              path="/view/:id"
              element={user ? <ViewNote /> : <Landing />}
            />
            <Route
              path="/edit/:id"
              element={user ? <EditNote /> : <Landing />}
            />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
// export const baseUrl = process.env.REACT_APP_ADDNOTE_BACKENED_URL + "/api/";
export const baseUrl = "http://localhost:5500/api/";
