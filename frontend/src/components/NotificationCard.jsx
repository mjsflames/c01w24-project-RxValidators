import React, { useState } from "react";
import { Link } from "react-router-dom";
import i from "../assets/i.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faX } from "@fortawesome/free-solid-svg-icons";
import api from "../axiosConfig";

const NotificationCard = ({notification}) => {
    const {_id, isArchived, isRead, message, title} = notification;
    const [visible, setVisible] = useState(true);
    
    const close = () => {
        api.put(`/notifications/read/${_id}`)        
        setVisible(false);
    }

    return (
        <div className={`flex items-center p-4 text-black border-t-4 border-gray-100 bg-gray-50 w-1/3 ${!visible && "hidden"}`} role="alert">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <h3 className="text-m font-bold">Notification | {title}</h3> 
            <div className="flex ms-3 text-sm font-medium">
                <p className="whitespace-pre">{message}</p>
            </div>
            <FontAwesomeIcon icon={faX} className="ml-auto text-red-700 cursor-pointer" onClick={close} />
        </div>
    )
}

export default NotificationCard;