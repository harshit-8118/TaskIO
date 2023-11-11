import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./context/user/UserContext";
import NotesContextProvider from "./context/notes/NotesContext";

const loadGoogleSearchScript = () => {
  const script = document.createElement('script');
  script.src = 'https://cse.google.com/cse.js?cx=' + process.env.REACT_APP_SEARCH_ENGINE_ID;
  script.async = true;
  document.body.appendChild(script);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthContextProvider>
      <NotesContextProvider>
        <App />
      </NotesContextProvider>
    </AuthContextProvider>
  </>
);

loadGoogleSearchScript();
reportWebVitals();
