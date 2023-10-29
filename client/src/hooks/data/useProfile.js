import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../utils";
import { followUser, getUser, unfollowUser, updateUser } from "../../api/user";
import { slugifyString } from "../../utils/string";

const useProfile = (slug)=>{
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();
  const [ userData, setUserData ] = useState({});
  const [ recipes, setRecipes ] = useState([]);
  const [ isRealProfile, setIsRealProfile ] = useState(false);
  const [ shouldFollow, setShouldFollow ] = useState(false);
  useQuery(
    ['profile', slug], ()=>getUser(slug).then(res=>res.data),
    { enabled:isAuthenticated,
      onSuccess: (data)=>{
        const { user:profile, recipes, onEdit } = data;
        if(isAuthenticated){
          setIsRealProfile(slugifyString(user?.displayName) === profile.slug);
          setShouldFollow(!profile?.followers?.includes(slugifyString(user?.displayName)));
        }
        setUserData(profile);
        if(isAuthenticated && profile.username === user?.displayName){
          setRecipes([...onEdit, ...recipes]);
        } else {
          setRecipes(recipes);
        }
      }
    }
  )
  const { mutate:updateProfile } = useMutation((data)=>updateUser(slug, data), {
    onSuccess:()=>queryClient.invalidateQueries({queryKey:['profile', slug]}),
    onError:(error)=>console.log(error)
  });
  const { mutate:follow } = useMutation((slug)=>followUser(slug), {
    onSuccess:()=>queryClient.invalidateQueries({queryKey:['profile', slug]})
  });
  const { mutate:unfollow } = useMutation((slug) => unfollowUser(slug), {
    onSuccess:()=>queryClient.invalidateQueries({queryKey:['profile', slug]})
  }); 
  return { 
    userData, recipes, 
    updateProfile, isRealProfile, 
    followUser: follow, unfollowUser: unfollow, shouldFollow
  };
}

export default useProfile;