import moment from "moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaEdit } from "react-icons/fa";
import { getUser } from "../../api/user";
import { Pagination } from "../../components/containers";
import { RatingIcons } from "../../components/icons";
import { Button } from "../../components/utils";
// import { recipes } from "../../utils/data";

const Profile = () => {
  const { slug } = useParams();
  const [ user, setUser ] = useState({});
  const [ recipes, setRecipes ] = useState([]);
  useEffect(()=>{
    getUser(slug).then(res=>{
      const { user, recipes } = res.data;
      setUser(user);
      setRecipes(recipes);
    })
  }, [slug]);
  const editPassword = () => console.log("Edit Password");
  const followUser = () => console.log("Follow User");
  return (
    <>
      <div className="py-5 px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border-red border rounded-md p-6 flex flex-col justify-between items-center font-nunito">
          <img
            src={user?.image??"/images/profile-card.png"}
            alt="profile"
            className="w-40 md:w-80 h-40 md:h-80 mb-4 rounded-full"
          />
          <h5 className="font-semibold text-2xl md:text-4xl">{user?.username??"John Doe"}</h5>
          <p className="font-extralight">{moment(user?.dob).format("Do MMMM YYYY")??"25th January 1992"}</p>
          <p className="font-extralight">{user?.email??"johndoe@joemail.com"}"</p>
          <div className="flex justify-between gap-1">
            <p className="font-light">******************</p>
            <FaEdit onClick={editPassword} className="cursor-pointer" />
          </div>
          <div onClick={followUser}>
            <Button theme="blue" className="text-sm md:text-base">FOLLOW</Button>
          </div>
          <div className="mt-2 md:grid md:grid-cols-3 gap-4 text-center">
            <div className="md:border-r-2 md:border-black px-2">
              <h6 className="font-semibold">followers</h6>
              <p className="font-light">100 people</p>
            </div>
            <div className="px-2">
              <h6 className="font-semibold">following</h6>
              <p className="font-light">10 people</p>
            </div>
            <div className="md:border-l-2 md:border-black px-2">
              <h6 className="font-semibold">recipes</h6>
              <p className="font-light">{recipes.length??0} recipes</p>
            </div>
          </div>
          <div className="flex place-items-center gap-1">
            <RatingIcons rating={user?.rating??3} />
            <p className="font-light">({user?.rating??3})</p>
          </div>
          <p className="w-60 font-extralight text-sm text-center break-words">
            This is the average rating based on all the chef’s recipe reviews
          </p>
        </div>
        <div className="py-5">
          <h5 className="mb-3 text-center text-3xl font-fjalla-one">
            Recipes by {user?.username??"John Doe"}
          </h5>
          <Pagination auto items={recipes} perPage={2}/>
        </div>
      </div>
    </>
  );
};

export default Profile;
