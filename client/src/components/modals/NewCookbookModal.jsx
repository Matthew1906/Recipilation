import Modal from "react-modal";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { useModal, useScreenSize } from "../../hooks"
import { NewCookbookForm } from "../forms";

Modal.setAppElement("#modal");

const NewCookbookModal = ()=>{
    const screenSize = useScreenSize();
    const { isOpen, modal, style } = useModal();
    style.content.height = screenSize>0?"240px":"180px";
    style.content.width = screenSize>0?"600px":"200px";
    return (
        <>
            <Button theme="yellow" onClick={modal.open}>New Cookbook</Button>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel="New Cookbook" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-2xl">New Cookbook</span>
                </div>
                <NewCookbookForm />
                <div className="mt-6 flex justify-center gap-4">
                    <Button 
                        theme="green" className="px-12" 
                        onClick={()=>{
                            modal.close();
                        }}
                    >SAVE</Button>
                </div>
            </Modal>
        </>
    );
}

export default NewCookbookModal;