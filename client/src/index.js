import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { DashboardLayout } from "./layouts";
import { Auth, Dashboard } from "./pages/constants";
import { Category, Cookbook, Profile, Recipe } from "./pages/contents";
import { Categories, Cookbooks, MyRecipes, NewRecipe, Search} from "./pages/core";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Auth purpose="login" />} />
      <Route path="register" element={<Auth purpose="register" />} />
      <Route element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="search" element={<Search />}/>
        <Route path='categories' element={<Categories />}/>
        <Route path='categories/:category' element={<Category />}/>
        <Route path='cookbooks' element={<Cookbooks />}/>
        <Route path='cookbooks/:cookbook' element={<Cookbook />}/>
        <Route path="my-recipes" element={<MyRecipes />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="recipes/:recipe" element={<Recipe />}/>
        <Route path="recipes/new" element={<NewRecipe />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
