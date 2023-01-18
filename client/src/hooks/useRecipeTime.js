import { useState } from "react";

const useRecipeTime = ()=>{
    const [time, setTime] = useState({amount:1, type:'minute'});
    const setAmount = (e)=>setTime(prevInput=>({...prevInput, amount:e.target.value}));
    const setType = (e)=>setTime(prevInput=>({...prevInput, type:e.target.value}));
    return [ time, setAmount, setType ];
}

export default useRecipeTime;