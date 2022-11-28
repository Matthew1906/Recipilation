import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Auth purpose="login" />} />
      <Route path="register" element={<Auth purpose="register" />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
