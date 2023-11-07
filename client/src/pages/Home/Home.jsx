import React, { useContext } from "react";
import { AuthContext } from "../../context/user/UserContext";
import { Logout } from "../../context/user/UserApi";

function Home() {
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    Logout(dispatch);
  };
  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
