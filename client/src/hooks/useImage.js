import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useImage = ()=>{
    const [image, setImage] = useState(null);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        maxFiles:1,
        onDrop: (acceptedFiles) => {
            setImage(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))[0]);
        }
    });
    return { image, setImage, getRootProps, getInputProps };
}

export default useImage;