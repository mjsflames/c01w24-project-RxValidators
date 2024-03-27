import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../App';
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Modal = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState("");
    const { getEmail } = useContext(UserContext);
    
    useEffect(() => {
        if (getEmail) setData(getEmail);

        const deleteHandler = async () => {
            try {
                const res = await api.delete(`http://localhost:5001/auth/removeUser/${data.email}`)
                console.log(res.data)
                useNavigate("/login")
            } catch (error) {
                setError(err.res.data.message);
                console.log(err.res)
            }
        }
        deleteHandler();
    }, []);
      
    
    // useEffect(() => {
    //     async function removeUser() {
    //         const username = user.email;
    //         try {
    //             const res = await fetch(`http://localhost:5001/auth/removeUser/${username}`, {
    //                 method: "DELETE",
    //             })
    //             .then(res => res.json())
    //             .then(res => console.log(res))
    //             if(res.status !== 200) {
    //                 console.log("User deletion failed");
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch username', error)
    //         }
    //     }
    //     removeUser();
    // }, []);

    return (
        <>
            <button id="deactivate" onClick={() => setShowModal(true)} className="bg-red-600 text-white hover:bg-red-200 text-sm rounded-full p-2.5">
                DELETE ACCOUNT    
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-50">
                        <div className="relative w-auto mx-auto">
                            <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none px-10"> 
                                <div className="flex items-start justify-between p-5">
                                    <h2 className="text-l font-bold mx-auto">Please Confirm Deletion</h2>
                                    <button className="bg-transparent text-black absolute right-2 top-0" onClick={() => setShowModal(false)}>X</button>
                                </div>
                                <div className="relative text-center flex-auto mb-5">
                                    <p>Are you sure you want to delete your account?</p>
                                    <p>Disclaimer: If your account is deleted, your prescriptions may remain.</p>
                                </div>
                                <div className="flex flex-row justify-center mb-5">
                                    <button id="deleteaccount" onClick={useEffect} className="bg-green-200 hover:bg-green-200/40 text-black border rounded-full p-2.5 mr-10">Yes, proceed</button>
                                    <button className="bg-red-200 hover:bg-red-200/40 text-black border rounded-full p-2.5" onClick={() => setShowModal(false)}>No, cancel</button>
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