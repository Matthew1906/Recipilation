import { useEffect, useState } from "react";
import { useAuth } from "../utils";
import { followUser, getUser, unfollowUser, updateUser } from "../../api/user";
import { useNavigate } from "react-router";
import { slugifyString } from "../../utils/string";

const useProfile = (slug)=>{
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({});
  const [ recipes, setRecipes ] = useState([]);
  const [ isRealProfile, setIsRealProfile ] = useState(false);
  const [ shouldFollow, setShouldFollow ] = useState(false);
  useEffect(()=>{
    getUser(slug).then(res=>{
      const { user:profile, recipes, onEdit } = res.data;
      setIsRealProfile(slugifyString(user?.displayName) === profile.slug);
      setShouldFollow(!profile?.followers?.includes(slugifyString(user?.displayName)));
      setUserData(profile);
      if(isAuthenticated && profile.username === user?.displayName){
        setRecipes([...onEdit, ...recipes]);
      } else {
        setRecipes(recipes);
      }
    }).catch(err=>console.log(err));
  }, [isAuthenticated, slug, user]);
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
  return { 
    userData, recipes, 
    updateProfile, isRealProfile, 
    followUser: follow, unfollowUser: unfollow, shouldFollow
  };
}

export default useProfile;