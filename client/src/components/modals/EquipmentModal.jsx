import { useState } from "react";
import Modal from "react-modal";
import { EquipmentCard } from "../cards";
import { EquipmentForm, SearchForm } from "../forms";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { useModal } from "../../hooks";
import { equipments } from "../../utils/data";

Modal.setAppElement("#modal");

const EquipmentModal = ({onSubmit})=>{
    const [status, setStatus] = useState(true);
    const toggleStatus = ()=>setStatus(!status);
    const { isOpen, openModal, closeModal, style, data, toggleData } = useModal();
    const searchEquipment = (value)=>console.log(value.query);
    const addEquipment = (data)=>console.log(data);
    return (
        <>
            <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" 
                onClick={openModal} type="button">+</Button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Equipment Modal" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={closeModal}/>
                    <span className="font-fjalla-one text-2xl">{status?"Search for":"Add New"} Equipment</span>
                </div>
                {status
                    ? <>
                        <SearchForm onSubmit={searchEquipment} color="black"/>
                        <div className="px-5 flex flex-wrap justify-start items-center gap-6">
                            {equipments.map((equipment, key)=>(
                                <EquipmentCard 
                                    equipment={equipment} 
                                    key={key} 
                                    onClick={()=>toggleData(equipment.name)} 
                                    status={data.includes(equipment.name)}
                                />
                            ))}
                        </div>
                    </>
                    : <EquipmentForm onSubmit={addEquipment}/> 
                }
                <div className="mt-6 flex justify-center gap-4">
                    <Button theme="orange" className="text-xl px-12" type="button" onClick={toggleStatus}>
                        {status?"ADD NEW":"FIND"}
                    </Button>
                    <Button 
                        theme="yellow" className="text-xl px-12" 
                        onClick={()=>{
                            onSubmit(data);
                            closeModal();
                        }}
                    >SAVE</Button>
                </div>
            </Modal>
        </>
    );
}

export default EquipmentModal;