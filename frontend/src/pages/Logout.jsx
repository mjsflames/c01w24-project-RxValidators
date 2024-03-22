import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import logo from "../assets/logo.svg";

const Logout = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    // redirect to login page
    useEffect(() => {

        setTimeout(() => {
            if (userContext.handleLogout()) {
                navigate('/login');
            }
        }, 1000); // Remove interval in future. just to simulate logging out

        if (userContext.user === null) {
            navigate('/login');
        }

    }, []);
    

    return (
        <div className='w-screen h-screen flex items-center justify-center flex-col'>

            <img src={logo} className="h-32 w-32" />

            <div className='flex flex-row-reverse gap-2 items-center'>
                <p>Logging you out...</p>

                <Spinner/>
            </div>
    </div>
  )
}

export default Logout