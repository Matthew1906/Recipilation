import moment from "moment/moment";
import { RatingIcons } from "../icons";

const CommentCard = ({comment})=>{
    const {user:{username}, datetime, rating, body} = comment;
    return (
        <div className="bg-white-primary p-4 border-black border-2 rounded-md">
            <h6 className="text-lg font-semibold">{username??"Unknown"}</h6>
            <p className="my-1">{moment(datetime??new Date()).format("MMMM D, YYYY [at] HH:mm")}</p>
            <RatingIcons rating={rating??0}/>
            <p className="break-words mt-1">{body??"No comment"}</p>
        </div>
    )
}

export default CommentCard;