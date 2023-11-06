import React, { useContext, useEffect, useReducer } from "react";
import { UserReducer } from "./UserReducer";

const initialValues = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = useContext(initialValues);

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
