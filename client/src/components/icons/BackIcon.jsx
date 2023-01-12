import { useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";

const BackIcon = ({className})=>{
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return <TiArrowBack onClick={goBack} className={className||""}/>
};

export default BackIcon;