import PropTypes from "prop-types";
import { AiOutlineCloudUpload } from "react-icons/ai";

const ImageInput = ({p, image, rootProps, inputProps})=>{
    return (
        <div {...rootProps({className: 'dropzone'})} 
            className={`${image?"p-2":`p-${p}`} bg-white-primary border-red border rounded-sm flex flex-col justify-center items-center`}
        >
            <input {...inputProps()} />
            {image 
            ? <img src={image.preview} alt="recipe" className="w-full h-56 object-contain opacity-75"/>
            :<>
                <AiOutlineCloudUpload className="w-12 h-12 opacity-75 cursor-pointer"/>
                <p className="opacity-75 text-sm text-center w-32 break-words">
                    Drop image here or click to upload
                </p>
            </>}
        </div>
    );
}

ImageInput.propTypes = {
    p: PropTypes.number, 
    image: PropTypes.object,
    rootProps: PropTypes.object,
    inputProps: PropTypes.object,
}

export default ImageInput;