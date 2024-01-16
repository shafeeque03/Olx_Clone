import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Context from "./context/Context.jsx";
import { FirebaseContext } from "./context/Context.jsx";
import firebase from "./firebase/config.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <FirebaseContext.Provider value={firebase}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  //</React.StrictMode>
);
