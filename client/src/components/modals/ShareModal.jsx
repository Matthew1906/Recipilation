import Modal from "react-modal";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { 
    EmailShareButton, EmailIcon, 
    FacebookShareButton, FacebookIcon,
    LineShareButton, LineIcon,
    WhatsappShareButton, WhatsappIcon
} from "react-share";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { BackIcon } from "../icons";
import { useModal, useScreenSize } from "../../hooks"

Modal.setAppElement("#modal");

const ShareModal = ({link, title, cookbook=false})=>{
    const { isOpen, modal, style } = useModal();
    const screenSize = useScreenSize();
    style.content.height = screenSize>0?"180px":"240px";
    style.content.width = screenSize>0?"400px":"200px";
    return (
        <>
            <FaShareAlt className="cursor-pointer link-expand text-lg" onClick={modal.open}/>
            <Modal isOpen={isOpen} onRequestClose={modal.close} contentLabel={`Share ${cookbook?"Cookbook":"Recipe"}`} style={style}>
                <div className="flex justify-center items-center mb-5">
                    <BackIcon className="text-2xl cursor-pointer" modal={modal.close}/>
                    <span className="font-fjalla-one text-2xl">Share Recipe</span>
                </div>
                <div className="flex justify-center items-start flex-wrap gap-3">
                    <EmailShareButton 
                        url={link} 
                        subject={`Check out this ${cookbook?"cookbook":"recipe"}`}
                        body={`Hi, how are you?\nI've just found an amazing ${title} ${cookbook?"cookbook":"recipe"}.\nVisit this link to check it out:`}
                        separator=" "
                    >
                        <EmailIcon className="rounded-full w-12 h-12" onClick={modal.close}/>
                    </EmailShareButton>
                    <FacebookShareButton 
                        url={link} 
                        quote={`I've just found an amazing ${title} ${cookbook?"cookbook":"recipe"}.\nVisit this link to check it out:`}
                    >
                        <FacebookIcon className="rounded-full w-12 h-12" onClick={modal.close}/>
                    </FacebookShareButton>
                    <LineShareButton url={link} title={`Check out this ${title} ${cookbook?"cookbook":"recipe"}`}>
                        <LineIcon className="rounded-full w-12 h-12" onClick={modal.close}/>
                    </LineShareButton>
                    <WhatsappShareButton url={link} title={`Check out this ${title} ${cookbook?"cookbook":"recipe"}`}>
                        <WhatsappIcon className="rounded-full w-12 h-12" onClick={modal.close}/>
                    </WhatsappShareButton>
                    <CopyToClipboard text={`Check out this ${title} ${cookbook?"cookbook":"recipe"}: ${link}`} onCopy={()=>alert("Copied to clipboard!")}>
                        <button 
                            className="w-12 h-12 bg-white-primary text-black font-nunito font-semibold tracking-wide border border-black rounded-full flex justify-center items-center"
                            onClick={modal.close}
                        >
                            <FaCopy width={24} height={24}/>
                        </button>
                    </CopyToClipboard>
                    
                </div>
            </Modal>
        </>
    );
}

export default ShareModal;