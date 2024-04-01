import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import pic from "../assets/prescribertable.jpg";
import AdminPrescription from "../components/AdminPrescription";

const AdminLogs = () => {
  const [data, setData] = useState(null);
  const [shownData, setShownData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [myItem, setItem] = useState(null);

  // Other states and useEffects...
  const [updatedItemDisplay, setUpdatedItemDisplay] = useState({});
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    async function fetchData() {
      const username = "testUser";
      try {
        const res = await fetch(`http://localhost:5001/list-prescriptions`, {
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

  const itemClick = (item) => {
    if (myItem !== item) {
      setItem(item);
    }
    else {
      setItem(null);
    }
  };

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
      initialCheckboxStates[index] = item.discoveryPass === "Yes";
    });
    setCheckboxStates(initialCheckboxStates);
  }, [shownData]);

  const handleCheckboxChange = (index, checked) => {
    setCheckboxStates(prev => ({
      ...prev,
      [index]: checked,
    }));
  };


  return (
    <>
      <PageHeader
        title="Administrator: Logged Prescriptions"
        desc="Check the status of all provider and patient prescription logs here."
      />
      <div className="flex w-full min-h-[650px] items-center justify-center bg-cover" style={{ backgroundImage: `url(${pic})` }}>

        <div class="rounded-xl w-4/5 bg-gray-200 bg-opacity-80 p-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="flex flex-col mx-auto mb-12 text-center">
            <h1 className="text-3xl underline font-bold !text-gray-900  mb-5">All Logged Prescriptions</h1>
            <p className="font-semibold">Prescription status are able to be searched by the date and status.</p>
            <p className="font-semibold">Change the status to "Complete with Discovery Pass" if requirements are met.</p>
          </div>
          <input type="search" placeholder="Search Here" onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            value={searchInput} className="flex w-1/4 p-2 placeholder:text-slate-800 bg-slate-100 border border-black rounded-md" />
          <table className="w-full mt-10 mb-20 text-sm rtl:text-right text-gray-500 rounded-lg">
            <thead className="text-xs text-left text-black uppercase bg-[#f0fff0]">
              <tr>
                <th scope="col" className="px-2 py-3">Date</th>
                <th scope="col" className="px-2 py-3">Patient Initials</th>
                <th scope="col" className="px-2 py-3">Provider Code</th>
                <th scope="col" className="px-2 py-3">Discovery Pass?</th>
                <th scope="col" className="px-2 py-3">Prescription Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shownData && shownData.map((item, index) => (
                <>
                  <tr className="w-full text-left text-black border-t border-white odd:bg-white/60 even:bg-white">

                    <td><div className="p-1">{item.date}</div></td>
                    <td><div className="p-1">{item.patient_initials}</div></td>
                    <td><div className="p-1">{item.prescriber_code}</div></td>

                    <td className="px-2 py-3 w-1/8">
                      <input
                        type="checkbox"
                        checked={checkboxStates[index] || false}
                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                      />
                    </td>
                    <select className="py-3 w-full truncate max-w-md text-current bg-transparent placeholder:text-gray-700">
                      <option selected value={item.status} disabled>{item.status}</option>
                      <option value="Complete with Discovery Pass">Complete with Discovery Pass</option>
                      <option value="Both Logged With Discovery Pass">Both Logged With Discovery Pass</option>
                    </select>
                    <td>
                      <button className="rounded hover:bg-slate-300 font-bold underline p-2" onClick={() => itemClick(item)}> 
                        Show More
                      </button>
                    </td>
                  </tr>
                  {myItem === item && (<tr className="text-left text-black border-t border-white">
                    <td colSpan="6">
                      <AdminPrescription item={item} />
                    </td>
                  </tr>
                  )}
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