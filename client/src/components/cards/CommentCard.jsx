import moment from "moment/moment";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../../hooks";
import { RatingIcons } from "../icons";
import { slugifyString, titleString } from "../../utils/string";

const CommentCard = ({comment, updateAction, deleteAction})=>{
    const difficultyConfig = {
        easy: "text-yellow",
        medium: "text-orange",
        hard: "text-red",
    };
    const { isAuthenticated, user } = useAuth();
    const {user:{username, slug}, date, rating, body, difficulty} = comment;
    return (
        <div className="bg-white-primary p-4 border-black border-2 rounded-md">
            <div className="flex justify-between items-center">
                <h6 className="text-lg font-semibold">{username??"Unknown"}</h6>
                {isAuthenticated && slugifyString(user?.displayName) === slug &&
                <div className="flex gap-1">
                    <FaEdit className="cursor-pointer link-expand" onClick={updateAction}/>  
                    <FaTrashAlt className="text-red cursor-pointer link-expand" onClick={deleteAction}/>    
                </div>
                }
            </div>
            <p className="my-1">{moment(date??new Date()).format("MMMM D, YYYY [at] HH:mm")}</p>
            <RatingIcons rating={rating??0}/>
            <p className="break-words mt-1">{body??"No comment"}</p>
            <p className="mt-3 font-semibold">    
                Difficulty:{" "}
                <span className={`font-bold ${difficultyConfig[difficulty.toLowerCase()]}`}>
                    {titleString(difficulty)}
                </span>
            </p>
        </div>
    )
}

export default CommentCard;