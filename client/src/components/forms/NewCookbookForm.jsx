import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextInput } from "./helpers";
import { Button } from "../utils";

const NewCookbookForm = ({onSubmit})=>{
    const { control, handleSubmit, formState:{errors} } = useForm({defaultValues:{name:''}});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <div className="flex">
                <TextInput name="name" control={control}
                    placeholder="Insert the name of your collection" 
                    className={`grow border-black rounded-r-none`}
                    minLength={1}
                />
                <Button className="rounded-l-none" theme="red" expand={false}>
                    Save
                </Button>
            </div>
            <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="mt-2 ml-2 text-sm text-left text-black">{message}</p>}/>
        </form>
    )
}


export default NewCookbookForm