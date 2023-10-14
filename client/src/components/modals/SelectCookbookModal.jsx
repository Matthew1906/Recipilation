import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SearchForm } from "../forms";
import { BackIcon, CombinationIcon } from "../icons";
import { Button } from "../utils";
import { addRecipeToCookbook, getCookbooks, searchCookbooks } from "../../api/cookbook";
import { useAuth, useModal, useScreenSize } from "../../hooks"

Modal.setAppElement("#modal");

const SelectCookbookModal = ({recipe})=>{
    const { isAuthenticated } = useAuth();
    const [ query, setQuery ] = useState("");
    const [ cookbooks, setCookbooks ] = useState([]);
    const { isOpen, modal, style, data } = useModal();
    useEffect(()=>{
        if(isAuthenticated){
            getCookbooks().then(res=>{
                setCookbooks(res.data);   
            });
        }
    }, [isOpen, isAuthenticated])
    const search = (value)=>setQuery(value);
    useEffect(()=>{
        if(isAuthenticated){
            searchCookbooks(query).then(res=>setCookbooks(res.data));
        }
    }, [query, isAuthenticated])
    const navigate = useNavigate();
    const onSubmit = (data)=>{
        addRecipeToCookbook(data[0], {recipe})
        navigate(`/cookbooks/${data[0]}`);
    }
    const screenSize = useScreenSize();
    style.content.height = screenSize>0?"600px":"400px";
    style.content.width = screenSize>0?"400px":"300px";
    return (
        <>
            <Button theme="green" onClick={modal.open} type="button">Add to Collection</Button>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel="Category Modal" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-2xl">Search for Cookbook</span>
                </div>
                <>
                    <SearchForm onSubmit={search} color="black"/>
                    <div className="px-5 flex flex-wrap justify-center items-center gap-6">
                    {cookbooks.map((cookbook, key) => (
                        <CombinationIcon
                            key={key}
                            images={cookbook.images.slice(0, 4)}
                            name={cookbook.name}
                            onClick={()=>{data.clear(); data.toggle(cookbook.slug)}} 
                            status={data.value.includes(cookbook.slug)}
                        />
                    ))}
                    </div>
                </>
                <div className="mt-6 flex justify-center gap-4">
                    <Button 
                        theme="yellow" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12" 
                        onClick={()=>{
                            onSubmit(data.value);
                            modal.close();
                        }}
                    >SAVE</Button>
                </div>
            </Modal>
        </>
    );
}

export default SelectCookbookModal;