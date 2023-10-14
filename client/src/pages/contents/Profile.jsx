import moment from "moment";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { followUser, getUser, unfollowUser, updateUser } from "../../api/user";
import { Pagination } from "../../components/containers";
import { ProfileForm } from "../../components/forms";
import { RatingIcons } from "../../components/icons";
import { Button } from "../../components/utils";
import { useAuth } from "../../hooks";
import { slugifyString } from "../../utils/string";

const Profile = () => {
  const { slug } = useParams();
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({});
  const [ recipes, setRecipes ] = useState([]);
  const [ isUpdate, setIsUpdate] = useState(false);
  useEffect(()=>{
    getUser(slug).then(res=>{
      const { user:profile, recipes, onEdit } = res.data;
      setUserData(profile);
      if(isAuthenticated && profile.username === user.displayName){
        setRecipes([...onEdit, ...recipes]);
      }else{
        setRecipes(recipes);
      }
      
    }).catch(err=>console.log(err));
  }, [isAuthenticated, slug, user]);
  const showUpdateProfile = () => setIsUpdate(true);
  const showRecipes = ()=> setIsUpdate(false);
  const updateProfile = (data)=>{
    updateUser(userData?.slug, data)
      .then(res=>{
        navigate("/profiles/"+res.data[0].slug)
        window.location.reload();
      })
      .catch(err=>console.log(err))
  };
  const follow = () => followUser(userData?.slug).finally(()=>navigate('/profiles/'+slugifyString(user?.displayName)));
  const unfollow = () => unfollowUser(userData?.slug).finally(()=>navigate('/profiles/'+slugifyString(user?.displayName)));
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
          { isAuthenticated && slugifyString(user?.displayName) === userData?.slug &&
          <>
            <p className="font-extralight">{moment(userData?.dob).format("Do MMMM YYYY")??"25th January 1992"}</p>
            <p className="font-extralight">{userData?.email??"johndoe@joemail.com"}</p>
            <p className="font-light">******************</p>
          </>
          }
          { isAuthenticated && slugifyString(user?.displayName) !== userData?.slug && 
          <>
          { !userData?.followers?.includes(slugifyString(user?.displayName))
           ? <Button theme="blue" className="text-sm md:text-base" onClick={follow} expand>FOLLOW</Button>
           : <Button theme="red" className="text-sm md:text-base" onClick={unfollow} expand>UNFOLLOW</Button>
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
            ? <ProfileForm onCancel={showRecipes} data={userData} onSubmit={updateProfile}/>
            : <> 
              <h5 className="mb-3 text-center text-3xl font-fjalla-one">
                Recipes by {userData?.username??"John Doe"}
              </h5>
              <Pagination auto items={recipes} perPage={2}/>
              { isAuthenticated && slugifyString(user?.displayName) === userData?.slug &&
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
