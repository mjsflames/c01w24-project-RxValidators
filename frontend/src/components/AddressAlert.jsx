import React from "react";
import { Link } from "react-router-dom";
import i from "../assets/i.png";

const AddressAlert = () => {

    return (
        <div id="addressalert" className="flex items-center p-4 mb-4 text-black border-t-4 border-red-300 bg-red-50" role="alert">
            <img src={i} className="flex-shrink-0 inline w-4 h-4 me-3"/>
            <h3 className="text-m font-bold">Missing Address!</h3> 
            <div className="flex ms-3 text-sm font-medium">
                <p className="whitespace-pre">A discovery pass was prescribed but an address is missing. Please add an address here:   </p>
                <Link to="/" className="font-bold text-red-600 hover:text-red-900 underline hover:no-underline">Account</Link>
            </div>
        </div>
    )
}

export default AddressAlert;