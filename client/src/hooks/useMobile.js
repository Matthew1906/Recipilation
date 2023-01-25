import { useState, useEffect } from "react"

const useMobile = ()=>{
    const [isMobile, setMobile] = useState(false); 
    const handleResize = ()=>{
        if(window.innerWidth<768){
            setMobile(0);
        }
        else if(window.innerWidth<1024){
            setMobile(1);
        }
        else setMobile(2);
    }
    useEffect(()=>{
        handleResize();
        window.addEventListener('resize', handleResize)
        return()=>{
            window.removeEventListener('resize', handleResize)
        }
    }, []);
    return isMobile;
}

export default useMobile;