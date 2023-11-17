import React, { useContext } from "react";
import "../../GlobalCSS.scss";
import { AuthContext } from "../../context/user/UserContext";
import { Logout } from "../../context/user/UserApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Settings } from "@mui/icons-material";
import { NotesContext } from "../../context/notes/NotesContext";
import { cleanNoteOnLogout } from "../../context/notes/NotesApi";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const { dispatch: notesDispatch } = useContext(NotesContext);
  const { notes } = useContext(NotesContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  return (
    <div className="nav">
      <div className="navbar">
        <div className="navbar-left">
          <img
            src="https://www.klipfolio.com/sites/default/files/partners/logo-taskio_0.png"
            alt="TASKIO"
          />
        </div>
        <div className="navbar-middle">
          <Link to={"/"} className={`link ${isActiveLink("/") && "active"}`}>
            <Home />
          </Link>
          <Link
            to={"/allnotes"}
            className={`link ${isActiveLink("/allnotes") && "active"}`}
            state={notes}
          >
            ALL
          </Link>
          <Link
            to={"/notes"}
            state={{ don: true }}
            className={`link ${isActiveLink("/notes") && "active"}`}
          > TASKS
          </Link>
        </div>
        <div className="navbar-right">
          <div className="g-search-box">
            <div className={"gcse-search"}></div>
          </div>
          <abbr title="Settings" className="settings-btn">
            <Link to={"/settings"} state={{ user }} className="link">
              <Settings className="settings-ico" />
            </Link>
          </abbr>
          <button
            className="logout-btn"
            onClick={() => {
              if (window.confirm(`You will be logout, ${user.username}`)) {
                Logout(dispatch);
                cleanNoteOnLogout(notesDispatch);
                navigate("/");
              }
            }}
          >
            <abbr title="Logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-icon"
                style={{
                  width: "1em",
                  height: "1em",
                  verticalAlign: "middle",
                  fill: "currentColor",
                  overflow: "hidden",
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z"
                  fill=""
                />
                <path
                  d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z"
                  fill=""
                />
              </svg>
            </abbr>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
