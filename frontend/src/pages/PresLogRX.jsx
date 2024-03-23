import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const LogPresPrescription = () => {
    
    function handleClick () {
        alert('Prescription Log Submitted!');
    }
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
				desc="For new prescriptions, please fill out the form and submit below."
			/>
			<ContentContainer>
                <form onSubmit={handleClick} className="absolute start-1/3 right-1/3"> 
                    <h2 className="mb-8 font-bold">Prescriber Prescription Form</h2> 
                    <div className="relative z-0 w-full mb-8 group">
                        <input type ="date" id="date" className="block py-2.5 w-full text-l text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" placeholder="" required />
                        <label for="rx_date" className="absolute font-semibold text-black -translate-y-6 top-1">Prescription Date</label>
                    </div> 
                    <div className="relative z-0 w-full mb-8 group">
                        <input id="initials" type="text" maxLength="2" className="block py-2.5 w-full text-l text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" required />
                        <label for="patient_initials" className="absolute font-semibold text-l text-black duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Patient Initials</label>
                    </div>
                    <div className="relative z-0 w-full mb-8 group">
                        <input id="comments" className="block py-2.5 w-full text-l text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=""/>
                        <label for="rx_comments" className="absolute font-semibold text-l text-black duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prescription Details (Optional)</label>
                    </div>
                    <label for="discovery" className="block mb-3 text-l font-semibold font-medium text-gray-900 dark:text-white">Is there a Discovery Pass with this prescription?</label>
                    <select required="required" name="discovery" id="discovery" className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg block p-2.5">
                        <option disabled selected value="" defaultValue="">Choose an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <br />
                    <button type="submit" className="text-white bg-[#5C6528] font-medium rounded-lg text-sm px-5 py-2.5 absolute right-0 text-center">Submit</button>
                </form>
			</ContentContainer>
            <PageFooter></PageFooter>
		</>
	);
};

export default LogPresPrescription;