import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import HeroesList from "./components/HeroesList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/heroes", element: <HeroesList /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // strict mode is for the clean up code that will run before the useEffect started
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
