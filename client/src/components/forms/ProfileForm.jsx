import moment from "moment";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DateInput, ImageInput, InputLabel, TextInput } from "./helpers";
import { Button } from "../utils";
import { useImage } from "../../hooks";
import { base64String } from "../../utils/string";

const ProfileForm = ({updateProfile, cancelUpdate, data})=>{
    const { username, dob } = data;
    const { control, handleSubmit, formState:{ errors } } = useForm({
        defaultValues:{
            username:username,
            dob: moment(dob).format('YYYY-MM-DD')
        }
    });
    const { image, setImage, getRootProps, getInputProps } = useImage();
    const submit = (data)=>{
        if(image!==null){
            fetch(image.preview).then(r => {
                r.blob().then(res=>base64String(res).then(res=>{
                    updateProfile({...data, image:res});
                    setImage(null);
                }))
            });
        }        
        else{
            updateProfile({...data, image});
            setImage(null);
        }
    }
    return (
        <form className="mt-4 px-5 py-4 border border-red rounded-md" onSubmit={handleSubmit(submit)}>
            <h5 className="text-center text-3xl font-fjalla-one mb-2">Edit Profile</h5>
            <InputLabel className="mb-3" required>Username</InputLabel>
            <TextInput name="username" control={control} className="w-full text-black"/>
            <ErrorMessage errors={errors} name="username" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
            <InputLabel className="my-3" required>Date of Birth</InputLabel>
            <DateInput type='date' name="dob" control={control} className="w-full text-black"/>
            <ErrorMessage errors={errors} name="dob" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
            <InputLabel className="my-3">Profile Picture</InputLabel>
            <ImageInput image={image} rootProps={getRootProps} inputProps={getInputProps} p={10}/>
            <div className="mt-4 flex justify-between">
                <Button theme="red" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12" onClick={cancelUpdate}>CANCEL</Button>
                <Button theme="green" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12">SAVE</Button>
            </div>
        </form>
    );
}

ProfileForm.propTypes = {
    updateProfile: PropTypes.func, 
    cancelUpdate: PropTypes.func, 
    data: PropTypes.object
}

export default ProfileForm;