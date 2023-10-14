import Modal from "react-modal";
import { NewCookbookForm } from "../forms";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { saveCookbook } from "../../api/cookbook";
import { useModal, useScreenSize } from "../../hooks"

Modal.setAppElement("#modal");

const NewCookbookModal = ()=>{
    const screenSize = useScreenSize();
    const { isOpen, modal, style } = useModal();
    style.content.height = "170px";
    style.content.width = screenSize>0?"600px":"300px";
    const saveNewCookbook = (data)=>{
        saveCookbook(data);
        modal.close();
        window.location.reload();
    }
    return (
        <>
            <Button theme="yellow" onClick={modal.open} className='text-xs md:text-base'>New Cookbook</Button>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel="New Cookbook" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-lg md:text-xl lg:text-2xl">New Cookbook</span>
                </div>
                <NewCookbookForm onSubmit={saveNewCookbook}/>
            </Modal>
        </>
    );
}

export default NewCookbookModal;