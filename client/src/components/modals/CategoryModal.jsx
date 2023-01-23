import Modal from "react-modal";
import { Button } from "../utils";
import { useModal } from "../../hooks";

Modal.setAppElement("#modal");

const CategoryModal = ()=>{
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" onClick={openModal} type="button">+</Button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Category Modal"
            >
                <h2>This is a Category Modal</h2>
            </Modal>
        </>
    );
}

export default CategoryModal;