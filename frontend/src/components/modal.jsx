import React from "react";
import x from "../assets/x.jpg"

const Modal = () => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <>
            <button id="deactivate" onClick={() => setShowModal(true)} className="bg-red-600 text-white hover:bg-red-200 text-sm rounded-full p-2.5">
                DEACTIVATE ACCOUNT    
            </button>
            <dialog id="confirm">
                
            </dialog>

            
        </>
    )
}

export default Modal;