import { useState } from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TextArea } from "./helpers";
import { Button } from "../utils";
import { categoryConfig } from "../../utils/theme";

const CommentForm = () => {
  const [review, setReview] = useState({});
  const changeComment = (e) => setReview(prevInput=>({...prevInput, body:e.target.value}));
  const changeRating = (rating) => setReview(prevInput=>({...prevInput, rating}));
  const changeDifficulty = (diff) => setReview(prevInput=>({...prevInput, difficulty:diff}));
  const submitForm = (e)=>{
    e.preventDefault();    
    console.log(review)
  }
  return (
    <form className="px-10 py-8 bg-white-primary" onSubmit={submitForm}>
      <h2 className="pt-5 font-fjalla-one text-3xl mb-3 md:mb-0">
        Leave a Comment
      </h2>
      <h4 className="pt-2 font-nunito font-extralight text-2xl">
        Only your name will be published
      </h4>
      <TextArea
        rows={10} className="mt-4"
        placeholder="Write down your thoughts..."
        onChange={changeComment} value={review.body || ""}
      />
      <div className="flex justify-between py-2">
        <div className="flex justify-between items-center gap-4">
          <Rating
            emptySymbol={<FaRegStar className="text-yellow w-10 h-10" />}
            fullSymbol={<FaStar className="text-yellow w-10 h-10" />}
            onChange={changeRating}
            fractions={2}
            initialRating={review.rating || 2.5}
          />
          <div className="flex justify-center">
            <button
              type="button"
              className={`${categoryConfig["yellow"]} p-4 rounded-l-lg z-0 hover:z-10 link-expand ${review.difficulty==="easy"?"font-bold":""}`}
              onClick={()=>changeDifficulty('easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`${categoryConfig["orange"]} p-4 z-0 hover:z-10 link-expand ${review.difficulty==="medium"?"font-bold":""}`}
              onClick={()=>changeDifficulty('medium')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`${categoryConfig["red"]} p-4 rounded-r-lg z-0 hover:z-10 link-expand ${review.difficulty==="hard"?"font-bold":""}`}
              onClick={()=>changeDifficulty('hard')}
            >
              Hard
            </button>
          </div>
        </div>
        <Button theme="green" expand>Submit</Button>
      </div>
    </form>
  );
};

export default CommentForm;
