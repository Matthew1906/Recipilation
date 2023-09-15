import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./contexts";
import { DashboardLayout, UserLayout } from "./layouts";
import { Auth, Dashboard } from "./pages/constants";
import { Category, Profile, Recipe } from "./pages/contents";
import { Categories, NewRecipe, Search} from "./pages/core";

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
          <Route path='categories/:slug' element={<Category />}/>
          <Route path="profiles/:slug" element={<Profile />}/>
          <Route path="recipes/:slug" element={<Recipe />}/>
          <Route element={<UserLayout/>}>
            <Route path="recipes-new" element={<NewRecipe/>}/>
            <Route path='recipes/:slug/edit' element={<NewRecipe isEdit/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
