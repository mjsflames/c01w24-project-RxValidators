import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const LogPrescription = () => {

    // const [value, setValue] = useState({ 
    //     startDate: new Date(), 
    //     endDate: new Date().setMonth(11) 
    // }); 
        
    // const handleValueChange = (newValue) => {
    //     console.log("newValue:", newValue); 
    //     setValue(newValue); 
    // } 
	return (
		<>
			<PageHeader
				title="Log a Prescription"
				desc="For any new prescriptions, please fill out the form and submit below."
			/>
			<ContentContainer>
            <form>
                <div class="absolute start-1/3 right-1/3">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type ="date" id="date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" required />
                        <label for="rx_date" class="absolute text-black transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Prescription Date</label>
                    </div> 
                    <div class="relative z-0 w-full mb-5 group">
                        <input id="initials" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" required />
                        <label for="patient_initials" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Patient Initials</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input id="comments" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" required />
                        <label for="rx_comments" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prescription Details</label>
                    </div>
                    <label for="discovery" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is there a Discovery Pass with this prescription?</label>
                        <select id="discovery_pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        <br />
                <button type="submit" class="text-white bg-[#5C6528] hover:bg-green-1000 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                </div>
            </form>
			</ContentContainer>
		</>
	);
};

export default LogPrescription;