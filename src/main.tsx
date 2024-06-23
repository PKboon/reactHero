import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // strict mode is for the clean up code that will run before the useEffect started
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
