import React, { useState } from "react";

const Modal = () => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button id="deactivate" onClick={() => setShowModal(true)} className="bg-red-600 text-white hover:bg-red-200 text-sm rounded-full p-2.5">
                DEACTIVATE ACCOUNT    
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-50">
                        <div className="relative w-auto mx-auto">
                            <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none px-10"> 
                                <div className="flex items-start justify-between p-5">
                                    <h2 className="text-l font-bold mx-auto">Please Confirm Deactivation</h2>
                                    <button className="bg-transparent text-black absolute right-2 top-0" onClick={() => setShowModal(false)}>X</button>
                                </div>
                                <div className="relative flex-auto mb-5">
                                    <p>Are you sure you want to send a deactivation request?</p>
                                </div>
                                <div className="flex flex-row justify-center mb-5">
                                    <button id="deleteaccount" className="bg-green text-black mr-10" onClick={() => setShowModal(false)}>Yes, proceed</button>
                                    <button className="bg-red text-black" onClick={() => setShowModal(false)}>No, cancel</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default Modal;