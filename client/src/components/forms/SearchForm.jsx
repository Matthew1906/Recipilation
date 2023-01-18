import { useState } from "react";
import { TextInput } from "./helpers";
import { Button } from "../utils";

const SearchForm = ({onSubmit})=>{
    const [query, setQuery] = useState("");
    const changeQuery = (e) => setQuery(e.target.value);
    const submitQuery = (e)=>{
        e.preventDefault();
        onSubmit(query);
    }
    return (
        <form onSubmit={submitQuery} className="flex p-5">
            <TextInput 
                onChange={changeQuery} 
                value={query || ""} 
                placeholder="Search recipes, categories, or users" 
                className="grow text-red placeholder:text-red rounded-r-none"
            />
            <Button className="rounded-l-none" theme="red" expand={false}>
                Search
            </Button>
      </form>
    )
}

export default SearchForm;