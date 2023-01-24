import Modal from "react-modal";
import { EquipmentCard } from "../cards";
import { EquipmentForm, SearchForm } from "../forms";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { useModal } from "../../hooks";
import { equipments } from "../../utils/data";

Modal.setAppElement("#modal");

const EquipmentModal = ({onSubmit})=>{
    const { isOpen, modal, style, data, status } = useModal();
    const searchEquipment = (value)=>console.log(value.query);
    const addEquipment = (data)=>console.log(data);
    return (
        <>
            <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" 
                onClick={modal.open} type="button">+</Button>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel="Equipment Modal" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-2xl">{status.value?"Search for":"Add New"} Equipment</span>
                </div>
                {status.value
                    ? <>
                        <SearchForm onSubmit={searchEquipment} color="black"/>
                        <div className="px-5 flex flex-wrap justify-start items-center gap-6">
                            {equipments.map((equipment, key)=>(
                                <EquipmentCard 
                                    equipment={equipment} 
                                    key={key} 
                                    onClick={()=>data.toggle(equipment.name)} 
                                    status={data.value.includes(equipment.name)}
                                />
                            ))}
                        </div>
                    </>
                    : <EquipmentForm onSubmit={addEquipment}/> 
                }
                <div className="mt-6 flex justify-center gap-4">
                    <Button theme="orange" className="text-xl px-12" type="button" onClick={status.toggle}>
                        {status.value?"ADD NEW":"FIND"}
                    </Button>
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

export default EquipmentModal;