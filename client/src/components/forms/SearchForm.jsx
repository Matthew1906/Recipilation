import { useForm } from "react-hook-form";
import { TextInput } from "./helpers";
import { Button } from "../utils";

const SearchForm = ({onSubmit})=>{
    const { control, handleSubmit } = useForm({defaultValues:{query:''}});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex p-5">
            <TextInput name="query" control={control}
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