import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import pic from "../assets/prescribertable.jpg";
import api from "../axiosConfig";

const AdminLogs = () => {
  const [data, setData] = useState(null);
  const [shownData, setShownData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [update, setUpdate] = useState(false);

  // Other states and useEffects...
  const [updatedItemDisplay, setUpdatedItemDisplay] = useState({});
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const sampleData = [
      {
        "date": "2024-05-12",
        "patient_initials": "AB",
        "prescriber_code": "001",
        "status": "Pa Logged",
        "comments": "Details for item 1",
        "discovery": true,
        "user_type": "Patient",
      },
      {
        "date": "2024-03-12",
        "patient_initials": "AB",
        "prescriber_code": "001",
        "status": "Pr Logged",
        "comments": "Details for item 2 asjdfklajsdlfj alsdfjaslkdfjas lasdjfaslkdjf alsdkjfalskdjfaslkdfjalksdjf aslkdfjalsd fal",
        "discovery": true,
        "user_type": "Prescriber"
      },
      {
        "date": "2024-03-12",
        "patient_initials": "EF",
        "prescriber_code": "001",
        "status": "Pr not logged yet",
        "comments": "Details for item 3",
        "user_type": "Prescriber"
      }
    ];

    setData(sampleData)
    setShownData(shownData)
  }, []);

  useEffect(() => {
    async function fetchData() {
      const username = "testUser";
      try {
        const res = await fetch(`http://localhost:5001/api/getPrescriptions/${username}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error('No response');
        }
        const pData = await res.json();
        console.log(pData);

        if (pData) {
          setData(pData);
          setShownData(shownData)
        }
      } catch (error) {
        console.error('No fetch:', error);
      }

    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = await filterData(data, searchInput);
      setShownData(filteredData);
    };

    fetchData();
  }, [data, searchInput]);

  async function filterData(data, filterString) {
    if (!filterString) return data;

    // Only Date and Status
    // return data.filter(item => (item.date + item.status).toLowerCase().includes(filterString));

    // All fields
    return data.filter(item => JSON.stringify(item).toLowerCase().includes(filterString));
  }

  useEffect(() => {
    if (!shownData) return; // Ensure shownData is initialized

    const initialCheckboxStates = {};
    shownData.forEach((item, index) => {
      initialCheckboxStates[index] = item.discoveryPass;
    });
    setCheckboxStates(initialCheckboxStates);
  }, [shownData]);

  const handleCheckboxChange = (index, checked) => {
    setCheckboxStates(prev => ({
      ...prev,
      [index]: checked,
    }));
  };

  const updateLogStatus = async (updatedItem) => {
    const payload = {
      date: updatedItem.date,
      patient_initials: updatedItem.patient_initials,
      prescriber_code: updatedItem.parx_code,
      discoveryPass: updatedItem.discoveryPass,
    };

    // Filter out attributes with empty string values
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value !== '')
    );

    // Assuming this function does something with updatedItem, like sending it to an API
    console.log("Updating item with the following details:", updatedItem);

    // Update the state to display the updated item data
    setUpdatedItemDisplay(payload);

		try {
			const response = await api.post(`http://localhost:5001/api/update-prescription/${updatedItem.oid}`, filteredPayload);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

  // const updateLogStatus = async (itemToUpdate) => {
  //   // Construct the payload from the updated item data
  //   // const payload = {
  //   //     date: itemToUpdate.date,
  //   //     patient_initials: itemToUpdate.patient_initials,
  //   //     prescriber_code: itemToUpdate.prescriber_code,
  //   //     status: itemToUpdate.status,
  //   //     discovery: itemToUpdate.discovery,
  //   //     user_type: itemToUpdate.user_type,
  //   // };

  //   const payload = {
  //     date: "2024-03-14",
  //     patient_initials: "KW",
  //     prescriber_code: "RX123456",
  // };

  //   try {
  //       const response = await api.post(`http://localhost:5001/api/update-prescription/`, payload);
  //       console.log(response.data);
  //       // Optional: Update local state to reflect the change or fetch updated data
  //   } catch (error) {
  //       console.error(error);
  //   }
  // };

  
  return (
    <>
      <PageHeader
        title="All Prescriptions"
        desc="Check the status of all provider and patient prescription logs here."
      />
      <div className="flex w-full h-[650px] items-center justify-center bg-cover" style={{ backgroundImage: `url(${pic})` }}>

        <div class="rounded-xl w-3/4 bg-gray-200 bg-opacity-70 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="flex flex-col mx-auto mb-12 text-center">
            <h1 className="text-3xl underline font-bold !text-gray-900  mb-5">Administrator: All Logged Prescriptions</h1>
            <p className="font-semibold">Prescription status are able to be searched by the date and status.</p>
            <p className="font-semibold">Change the status to "Complete with Discovery Pass" if requirements are met.</p>
          </div>
          <input type="search" placeholder="Search by Date or Status" onChange={(e) => setSearchInput(e.target.value.toLowerCase())} value={searchInput} className="flex w-1/4 p-2" />
          <table className="w-full mt-10 mb-20 text-sm rtl:text-right text-gray-500">
            <thead className="text-xs text-left text-black uppercase bg-[#f0fff0]">
              <tr>
                <th scope="col" className="px-2 py-3">Date</th>
                <th scope="col" className="px-2 py-3">Patient Initials</th>
                <th scope="col" className="px-2 py-3">Provider Code</th>
                <th scope="col" className="px-2 py-3">Discovery Pass?</th>
                <th scope="col" className="px-2 py-3">User Type</th>
                <th scope="col" className="px-2 py-3">Prescription Status</th>
              </tr>
            </thead>
            <tbody>
              {shownData && shownData.map((item, index) => (
                <>
                  <tr className="w-full text-left text-black border-t border-white odd:bg-white/60 even:text-white even:bg-[#0a0e1a]/40 hover: "> 
                    <td><input data-key="date" type="text" id={`date-${index}`} className="px-2 py-3 text-white" placeholder={item.date}></input></td>
                    <td><input data-key="patient_initials" type="text" id={`patient_initials-${index}`} className="px-2 py-3 text-white" placeholder={item.patient_initials}></input></td>
                    <td><input data-key="parx_code" type="text" id={`parx_code-${index}`} className="px-2 py-3 text-white" placeholder={item.prescriber_code}></input></td>
                    <td className="px-2 py-3 w-1/8">
                      <input
                        type="checkbox"
                        checked={checkboxStates[index] || false}
                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                      />
                    </td>
                    <td><input type="text" id="user" className="px-2 py-3 text-white" placeholder={item.user_type}></input></td>
                    <select className="py-3 w-full truncate max-w-md text-white">
                      <option selected value={item.status} defaultValue={item.status} disabled>{item.status}</option>
                      <option value="Pa Not Logged">Pa Not Logged</option>
                      <option value="Pr Not Logged">Pr Not Logged</option>
                      <option value="Complete">Complete</option>
                      <option value="Complete with Discovery Pass">Complete with Discovery Pass</option>
                    </select>
                    <td>
                      <button className="w-20 rounded"
                        onClick={() => {
                          // Create an updated item object based on input values
                          const updatedItem = {
                            oid: item._id,
                            date: document.querySelector(`#date-${index}`).value,
                            patient_initials: document.querySelector(`#patient_initials-${index}`).value,
                            parx_code: document.querySelector(`#parx_code-${index}`).value,
                            discoveryPass: checkboxStates[index] || false
                          };
                          updateLogStatus(updatedItem); // Call your function with the updated item
                        }}>
                        Edit up
                      </button>
                    </td>
                  </tr>
                  {/* Display the updated item data */}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminLogs;