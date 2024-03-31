import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import instagram from "../assets/instagram.png"
import facebook from "../assets/fb.png"
import twitter from "../assets/twitter.png"

const testFooter = () => {

    return (
        <div className="flex flex-col">
            <footer className="mt-auto bg-[#bbbbbb]">
                <div className="mx-auto max-w-screen-xl">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">    
                            <a href="/" className="flex items-center">
                                <img src={logo} className="h-32 w-32" alt="PaRx"/>
                            </a>
                            <p className="text-sm font-semibold">RxValidators <br />
                                <Link to="https://bcparksfoundation.ca/" target="_blank"className="text-[#0000EE] hover:underline">© BC Parks Foundation, All rights reserved.</Link> 
                            </p>
                        </div> 
                        <div className="grid grid-cols-2 gap-4 px-4 py-6 lg:py-8 md:grid-cols-4 mr-0">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Park Prescriptions</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">PaRx Website</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">About Us</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">FAQs</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/news-and-blog#PaRx-Blog" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">News & Blog</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/whynature" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">Why Nature?</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/prescribers#Evidence-Based-Patient-Resources" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">Patient Resources</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Extras</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/contact" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">Contact Form</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about#Acknowledgments" target="_blank" rel="noopener noreferrer" className="text-[#0000EE] hover:underline">Acknowledgements</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                                <ul className="flex text-gray-600 dark:text-gray-400">
                                    <li className="mr-4">
                                        <Link to="https://www.facebook.com/healthybynaturecanada/" target="_blank" rel="noopener noreferrer">
					                        <img src={facebook} className="h-11 w-11"/>
				                        </Link>    
                                    </li>
                                    <li className="mr-4">
                                        <Link to="https://www.instagram.com/healthybynaturecanada/" target="_blank" rel="noopener noreferrer">
					                        <img src={instagram} className="h-11 w-11"/>
				                        </Link>    
                                    </li>
                                    <li className="mr-4">
                                        <Link to="https://twitter.com/HBNCanada" target="_blank" rel="noopener noreferrer">
					                        <img src={twitter} className="h-11 w-11"/>
				                        </Link>    
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>         
            </footer>
    </div>
            
        
    )
}

export default testFooter;