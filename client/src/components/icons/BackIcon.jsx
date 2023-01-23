import { useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";

const BackIcon = ({className, modal})=>{
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return <TiArrowBack onClick={modal?modal:goBack} className={className||""}/>
};

export default BackIcon;