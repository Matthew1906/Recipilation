import { useState } from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "../utils";
import { categoryConfig } from "../../utils/theme";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(2.5);
  const [difficulty, setDifficulty] = useState(null);
  const changeComment = (e) => setComment(e.target.value );
  const changeRating = (rating) => setRating(rating);
  const changeDifficulty = (diff) => setDifficulty(diff);
  const submitForm = (e)=>{
    e.preventDefault();    
    console.log({comment, rating, difficulty})
  }
  return (
    <form className="px-10 py-8 bg-white-primary" onSubmit={submitForm}>
      <h2 className="pt-5 font-fjalla-one text-3xl mb-3 md:mb-0">
        Leave a Comment
      </h2>
      <h4 className="pt-2 font-nunito font-extralight text-2xl">
        Only your name will be published
      </h4>
      <textarea
        rows="10"
        placeholder="Write down your thoughts..."
        onChange={changeComment}
        className="mt-4 p-4 w-full border-red rounded-lg caret-light-red"
        value={comment}
      />
      <div className="flex justify-between py-2">
        <div className="flex justify-between items-center gap-4">
          <Rating
            emptySymbol={<FaRegStar className="text-yellow w-10 h-10" />}
            fullSymbol={<FaStar className="text-yellow w-10 h-10" />}
            onChange={changeRating}
            fractions={2}
            initialRating={rating}
          />
          <div className="flex justify-center">
            <button
              type="button"
              className={`${categoryConfig["yellow"]} p-4 rounded-l-lg link-expand ${difficulty==="easy"?"font-bold":""}`}
              onClick={()=>changeDifficulty('easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`${categoryConfig["orange"]} p-4 link-expand ${difficulty==="medium"?"font-bold":""}`}
              onClick={()=>changeDifficulty('medium')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`${categoryConfig["red"]} p-4 rounded-r-lg link-expand ${difficulty==="hard"?"font-bold":""}`}
              onClick={()=>changeDifficulty('hard')}
            >
              Hard
            </button>
          </div>
        </div>
        <Button theme="green" expand={true}>Submit</Button>
      </div>
    </form>
  );
};

export default CommentForm;
