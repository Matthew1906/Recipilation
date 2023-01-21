import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextInput } from "./helpers";
import { Button } from "../utils";

const SearchForm = ({onSubmit})=>{
    const { control, handleSubmit, formState:{errors} } = useForm({defaultValues:{query:''}});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <div className="flex">
                <TextInput name="query" control={control}
                    placeholder="Search recipes, categories, or users" 
                    className="grow text-red placeholder:text-red rounded-r-none"
                />
                <Button className="rounded-l-none" theme="red" expand={false}>
                    Search
                </Button>
            </div>
            <ErrorMessage errors={errors} name="query" render={({ message }) => <p className="mt-2 ml-2 text-sm text-left text-black">{message}</p>}/>
        </form>
    )
}

export default SearchForm;