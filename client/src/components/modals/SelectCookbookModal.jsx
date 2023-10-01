import Modal from "react-modal";
import { SearchForm } from "../forms";
import { BackIcon, CombinationIcon } from "../icons";
import { Button } from "../utils";
import { useModal } from "../../hooks"
import { useEffect, useState } from "react";
import { addRecipeToCookbook, getCookbooks, searchCookbooks } from "../../api/cookbook";
import { useNavigate } from "react-router";

Modal.setAppElement("#modal");

const SelectCookbookModal = ({recipe})=>{
    const [ query, setQuery ] = useState("");
    const [ cookbooks, setCookbooks ] = useState([]);
    const { isOpen, modal, style, data } = useModal();
    useEffect(()=>{
        getCookbooks().then(res=>{
            setCookbooks(res.data);   
        });
    }, [isOpen])
    const search = (value)=>setQuery(value);
    useEffect(()=>{
        searchCookbooks(query).then(res=>setCookbooks(res.data));
    }, [query])
    const navigate = useNavigate();
    const onSubmit = (data)=>{
        addRecipeToCookbook(data[0], {recipe})
        navigate(`/cookbooks/${data[0]}`);
    }
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
                        theme="yellow" className="text-xl px-12" 
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