import { useState } from "react";
import RecipeCard from "../cards/RecipeCard";

const Pagination = ({items})=>{
    return (
        <>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((recipe, key) => (
              <RecipeCard recipe={recipe} key={key} />
            ))}
          </div>
        </>
    );
}

export default Pagination;