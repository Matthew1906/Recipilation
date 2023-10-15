import Rating from "react-rating";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TextArea } from "./helpers";
import { Button } from "../utils";
import { getReview, submitReview, updateReview } from "../../api/review";
import { useScreenSize } from "../../hooks";
import { categoryConfig } from "../../utils/theme";

const CommentForm = ({recipe, refreshPage}) => {
  const screenSize = useScreenSize();
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues:{
      body:"", 
      rating:2.5, 
      difficulty:'medium'
    }
  });
  const [isUpdate, setIsUpdate ] = useState(false);
  useEffect(()=>{
    getReview(recipe).then(res=>{
      if(res.data!==null){
        setValue('body', res.data.body);
        setValue('rating', res.data.rating);
        setValue('difficulty', res.data.difficulty);
        setIsUpdate(true);
      }
    }).catch(err=>reset());
  }, [recipe, setValue, reset]);
  const saveComment = (data)=>{
    let submit = isUpdate? updateReview:submitReview;
    submit(data, recipe).catch(err=>console.log(err)).finally(()=>{
      reset();
      refreshPage();
    })
  };
  return (
    <form className="px-10 py-8 bg-white-primary" onSubmit={handleSubmit(saveComment)}>
      <h2 className="pt-5 font-fjalla-one text-3xl mb-3 md:mb-0">
        Leave a Comment
      </h2>
      <h4 className="pt-2 font-nunito font-extralight text-2xl">
        Only your name will be published
      </h4>
      <TextArea
        rows={10} className="mt-4"
        placeholder="Write down your thoughts..."
        name="body" control={control}
      />
      <div className="flex justify-between py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Rating
            emptySymbol={<FaRegStar className="text-yellow w-10 h-10" />}
            fullSymbol={<FaStar className="text-yellow w-10 h-10" />}
            onChange={(rating)=>setValue('rating', rating)}
            fractions={2}
            initialRating={watch('rating')}
          />
          <div className="flex justify-center">
            <button
              type="button"
              className={`${categoryConfig["yellow"]} p-4 rounded-l-lg z-0 hover:z-10 link-expand ${watch('difficulty')==="easy"?"font-bold":""}`}
              onClick={()=>setValue('difficulty', 'easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`${categoryConfig["orange"]} p-4 z-0 hover:z-10 link-expand ${watch('difficulty')==="medium"?"font-bold":""}`}
              onClick={()=>setValue('difficulty', 'medium')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`${categoryConfig["red"]} p-4 rounded-r-lg z-0 hover:z-10 link-expand ${watch('difficulty')==="hard"?"font-bold":""}`}
              onClick={()=>setValue('difficulty', 'hard')}
            >
              Hard
            </button>
          </div>
        </div>
        {screenSize>0 && <Button theme="green" expand>{isUpdate?'Edit':'Submit'}</Button>}
      </div>
      {screenSize===0 && <div className="mt-4 grow flex justify-center"><Button theme="green" expand>{isUpdate?'Edit':'Submit'}</Button></div>}
    </form>
  );
};

export default CommentForm;
