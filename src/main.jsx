import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import ScreenForm from "./pages/ScreenForm/ScreenForm.jsx";
import SeeFormWithAdmin from "./pages/SeeFormWithAdmin/SeeFormWithAdmin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<ScreenForm />} />  
          <Route path="login" element={<Login />} />
          <Route path="SeeFormWithAdmin" element={<SeeFormWithAdmin />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
