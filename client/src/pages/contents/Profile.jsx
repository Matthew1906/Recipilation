import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router";
import { Pagination } from "../../components/containers";
import { ProfileForm } from "../../components/forms";
import { RatingIcons } from "../../components/icons";
import { Button } from "../../components/utils";
import { useAuth, useProfile } from "../../hooks";

const Profile = () => {
  const { slug } = useParams();
  const { isAuthenticated, loading } = useAuth();
  const [ isUpdate, setIsUpdate] = useState(false);
  const showUpdateProfile = () => setIsUpdate(true);
  const showRecipes = ()=> setIsUpdate(false);
  const { 
    userData, recipes, 
    updateProfile, isRealProfile, 
    followUser, unfollowUser, shouldFollow
  } = useProfile(slug);
  if(loading){
    return 'Loading'
  }
  else return (
    <>
      <div className="py-5 px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border-red border rounded-md p-6 flex flex-col justify-between items-center font-nunito">
          <img
            src={userData?.image??"/images/profile-card.png"}
            alt="profile"
            className="w-40 md:w-80 h-40 md:h-80 mb-4 rounded-full"
          />
          <h5 className="font-semibold text-2xl md:text-4xl">{userData?.username??"John Doe"}</h5>
          { isAuthenticated && isRealProfile &&
          <>
            <p className="font-extralight">{moment(userData?.dob).format("Do MMMM YYYY")??"25th January 1992"}</p>
            <p className="font-extralight">{userData?.email??"johndoe@joemail.com"}</p>
            <p className="font-light">******************</p>
          </>
          }
          { isAuthenticated && !isRealProfile && 
          <>
          { shouldFollow
           ? <Button theme="blue" className="text-sm md:text-base mt-5" onClick={()=>followUser(userData?.slug)} expand>FOLLOW</Button>
           : <Button theme="red" className="text-sm md:text-base mt-5" onClick={()=>unfollowUser(userData?.slug)} expand>UNFOLLOW</Button>
          }
          </>
          }
          <div className="mt-2 md:grid md:grid-cols-3 gap-4 text-center">
            <div className="md:border-r-2 md:border-black px-2">
              <h6 className="font-semibold">followers</h6>
              <p className="font-light">{userData?.followers?.length??0} people</p>
            </div>
            <div className="px-2">
              <h6 className="font-semibold">following</h6>
              <p className="font-light">{userData?.following??0} people</p>
            </div>
            <div className="md:border-l-2 md:border-black px-2">
              <h6 className="font-semibold">recipes</h6>
              <p className="font-light">{recipes.length??0} recipes</p>
            </div>
          </div>
          {userData?.rating &&
          <>
          <div className="flex place-items-center gap-1">
            <RatingIcons rating={userData?.rating??3} />
            <p className="font-light">({Math.round(userData?.rating*100)/100??3})</p>
          </div>
          <p className="w-60 font-extralight text-sm text-center break-words">
            This is the average rating based on all the chef’s recipe reviews
          </p>
          </>
          }
        </div>
        <div className="py-5 flex flex-col gap-5">
          {isAuthenticated && isUpdate
            ? <ProfileForm cancelUpdate={showRecipes} data={userData} updateProfile={updateProfile}/>
            : <> 
              <h5 className="mb-3 text-center text-3xl font-fjalla-one">
                Recipes by {userData?.username??"John Doe"}
              </h5>
              <Pagination auto items={recipes} perPage={2}/>
              { isAuthenticated && isRealProfile &&
                <div className="flex justify-between">
                  <Button theme='blue' onClick={showUpdateProfile}>Update Profile</Button>
                  <a href={`/recipes-new`}>
                    <Button theme='yellow'>New Recipe</Button>
                  </a>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Profile;