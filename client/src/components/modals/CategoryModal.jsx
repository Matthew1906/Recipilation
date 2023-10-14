import Modal from "react-modal";
import { useEffect, useState } from "react";
import { SearchForm } from "../forms";
import { BackIcon, CombinationIcon } from "../icons";
import { Button } from "../utils";
import { getCategories, searchCategories } from "../../api/category";
import { useModal, useScreenSize } from "../../hooks"

Modal.setAppElement("#modal");

const CategoryModal = ({onSubmit, draft})=>{
    const [ query, setQuery ] = useState("");
    const [ categories, setCategories ] = useState([]);
    const { isOpen, modal, style, data } = useModal();
    useEffect(()=>{
        getCategories().then(res=>{
            setCategories(res.data);
            draft.forEach(category=>{
                data.toggle(category);
            })     
        });
    }, [isOpen])
    const searchCategory = (value)=>setQuery(value);
    useEffect(()=>{
        searchCategories(query).then(res=>setCategories(res.data));
    }, [query])
    const screenSize = useScreenSize();
    style.content.height = screenSize>0?"600px":"400px";
    style.content.width = screenSize>0?"400px":"300px";
    return (
        <>
            <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" 
                onClick={modal.open} type="button">+</Button>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel="Category Modal" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-2xl">Search for Category</span>
                </div>
                <>
                    <SearchForm onSubmit={searchCategory} color="black"/>
                    <div className="px-5 flex flex-wrap justify-center items-center gap-6">
                    {categories.map((category, key) => (
                        <CombinationIcon
                            key={key}
                            images={category.images.slice(0, 4)}
                            name={category.name}
                            onClick={()=>data.toggle(category.name)} 
                            status={data.value.includes(category.name)}
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

export default CategoryModal;