import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./contexts";
import { DashboardLayout, UserLayout } from "./layouts";
import { Auth, Dashboard } from "./pages/constants";
import { Category, Cookbook, Profile, Recipe } from "./pages/contents";
import { Categories, Cookbooks, MyRecipes, NewRecipe, Search} from "./pages/core";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Auth purpose="login" />} />
        <Route path="register" element={<Auth purpose="register" />} />
        <Route element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="search" element={<Search />}/>
          <Route path='categories' element={<Categories />}/>
          <Route path='categories/:category' element={<Category />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="recipes/:slug" element={<Recipe />}/>
          <Route element={<UserLayout />}>
            <Route path='cookbooks' element={<Cookbooks />}/>
            <Route path='cookbooks/:cookbook' element={<Cookbook />}/>
            <Route path="my-recipes" element={<MyRecipes />}/>
            <Route path="recipes/new" element={<NewRecipe />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
