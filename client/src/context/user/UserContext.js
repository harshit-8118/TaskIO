import React, { createContext, useEffect, useReducer } from "react";
import { UserReducer } from "./UserReducer";
let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (err) {}
const initialValues = {
  user: user,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialValues);

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialValues);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
