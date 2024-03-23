import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import instagram from "../assets/instagram.png"
import facebook from "../assets/fb.png"
import twitter from "../assets/twitter.png"

const testFooter = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <footer className="mt-auto bg-[#bbbbbb]">
                <div className="mx-auto max-w-screen-xl">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">    
                            <a href="/" className="flex items-center">
                                <img src={logo} className="h-32 w-32" alt="PaRx"/>
                            </a> 
                        </div> 
                        <div className="grid grid-cols-2 gap-4 px-4 py-6 lg:py-8 md:grid-cols-4 mr-0">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Park Prescriptions</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/" target="_blank" rel="noopener noreferrer" className="hover:underline">PaRx Website</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about" target="_blank" rel="noopener noreferrer" className="hover:underline">About Us</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about" target="_blank" rel="noopener noreferrer" className="hover:underline">FAQs</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/news-and-blog#PaRx-Blog" target="_blank" rel="noopener noreferrer" className="hover:underline">News & Blog</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/whynature" target="_blank" rel="noopener noreferrer" className="hover:underline">Why Nature?</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/prescribers#Evidence-Based-Patient-Resources" target="_blank" rel="noopener noreferrer" className="hover:underline">Patient Resources</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="https://bcparksfoundation.ca/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about#Acknowledgments" target="_blank" rel="noopener noreferrer" className="hover:underline">Acknowledgements</a>
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