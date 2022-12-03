import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/constants/Dashboard";
import Auth from "./pages/constants/Auth";
import Search from "./pages/core/Search";
import Categories from "./pages/core/Categories";
import Cookbooks from "./pages/core/Cookbooks";
import MyRecipes from "./pages/core/MyRecipes";
import Category from "./pages/contents/Category";
import Cookbook from "./pages/contents/Cookbook";
import Profile from "./pages/contents/Profile";
import DashboardLayout from "./layouts/DashboardLayout";
import Recipe from "./pages/contents/Recipe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Auth purpose="login" />} />
      <Route path="register" element={<Auth purpose="register" />} />
      <Route element={<DashboardLayout/>}>
        <Route path="" element={<Dashboard />} />
        <Route path="search" element={<Search/>}/>
        <Route path='categories' element={<Categories />}/>
        <Route path='categories/:category' element={<Category />}/>
        <Route path='cookbooks' element={<Cookbooks />}/>
        <Route path='cookbooks/:cookbook' element={<Cookbook />}/>
        <Route path="my-recipes" element={<MyRecipes />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="recipes/:recipe" element={<Recipe />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
