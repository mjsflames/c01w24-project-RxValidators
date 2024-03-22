import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import instagram from "../assets/instagram.png"
import facebook from "../assets/fb.png"
import twitter from "../assets/twitter.png"

const testFooter = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <footer className="mt-auto bg-gray-300">
                <div class="mx-auto max-w-screen-xl">
                    <div class="md:flex md:justify-between">
                        <div class="mb-6 md:mb-0">    
                            <a href="https://www.parkprescriptions.ca/" class="flex items-center">
                                <img src={logo} className="h-32 w-32" alt="PaRx"/>
                            </a> 
                        </div> 
                        <div class="grid grid-cols-2 gap-4 px-4 py-6 lg:py-8 md:grid-cols-4 mr-0">
                            <div>
                                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Park Prescriptions</h2>
                                <ul class="text-gray-600 dark:text-gray-400">
                                    <li class="mb-4">
                                        <a href="https://www.parkprescriptions.ca/" class="hover:underline">PaRx Website</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about" class="hover:underline">About Us</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about" class="hover:underline">FAQs</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                                <ul class="text-gray-600 dark:text-gray-400">
                                    <li class="mb-4">
                                        <a href="https://bcparksfoundation.ca/privacy-policy/" class="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/about#Acknowledgments" class="hover:underline">Acknowledgements</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                                <ul class="text-gray-600 dark:text-gray-400">
                                    <li class="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/news-and-blog#PaRx-Blog" class="hover:underline">News & Blog</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/whynature" class="hover:underline">Why Nature?</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.parkprescriptions.ca/en/prescribers#Evidence-Based-Patient-Resources" class="hover:underline">Patient Resources</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                                <ul class="flex text-gray-600 dark:text-gray-400">
                                    <li class="mr-4">
                                        <Link to="https://www.facebook.com/healthybynaturecanada/">
					                        <img src={facebook} className="h-11 w-11"/>
				                        </Link>    
                                    </li>
                                    <li class="mr-4">
                                        <Link to="https://www.instagram.com/healthybynaturecanada/">
					                        <img src={instagram} className="h-11 w-11"/>
				                        </Link>    
                                    </li>
                                    <li class="mr-4">
                                        <Link to="https://twitter.com/HBNCanada">
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