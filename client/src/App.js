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

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
export const baseUrl = "http://localhost:5500/api/";
