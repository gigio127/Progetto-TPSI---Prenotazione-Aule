import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="QUI_DEVI_METTERE_IL_TUO_CLIENT_ID_GOOGLE">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);