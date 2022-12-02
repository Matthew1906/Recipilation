import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/constants/Dashboard";
import Auth from "./pages/constants/Auth";
import Search from "./pages/core/Search";
import Categories from "./pages/core/Categories";
import Cookbooks from "./pages/core/Cookbooks";
import MyRecipes from "./pages/core/MyRecipes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="login" element={<Auth purpose="login" />} />
      <Route path="register" element={<Auth purpose="register" />} />
      <Route path="search" element={<Search/>}/>
      <Route path='categories' element={<Categories />}/>
      <Route path='cookbooks' element={<Cookbooks />}/>
      <Route path="my-recipes" element={<MyRecipes />}/>
    </Routes>
  </BrowserRouter>
);
