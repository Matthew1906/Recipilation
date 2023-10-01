import Modal from "react-modal";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { useModal, useScreenSize } from "../../hooks"
import { NewCookbookForm } from "../forms";
import { saveCookbook } from "../../api/cookbook";

Modal.setAppElement("#modal");

const NewCookbookModal = ()=>{
    const screenSize = useScreenSize();
    const { isOpen, modal, style } = useModal();
    style.content.height = "170px";
    style.content.width = screenSize>0?"600px":"200px";
    const saveNewCookbook = (data)=>{
        saveCookbook(data);
        modal.close();
        window.location.reload();
    }
    return (
        <>
            <Button theme="yellow" onClick={modal.open}>New Cookbook</Button>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel="New Cookbook" style={style}>
                <div className="flex justify-center items-center">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-2xl">New Cookbook</span>
                </div>
                <NewCookbookForm onSubmit={saveNewCookbook}/>
            </Modal>
        </>
    );
}

export default NewCookbookModal;