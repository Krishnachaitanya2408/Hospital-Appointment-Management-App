import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import LoginContext from "./context/LoginContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
    </StrictMode>
);