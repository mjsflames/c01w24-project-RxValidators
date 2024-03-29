import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import pic from "../assets/prescribertable.jpg";
import api from "../axiosConfig";

const AdminLogs = () => {
  const [data, setData] = useState(null);
  const [shownData, setShownData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [update, setUpdate] = useState(false);

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

  // useEffect(() => {
  //   async function fetchData() {
  //     const username = "testUser";
  //     try {
  //       const res = await fetch(`http://localhost:5001/api/getPrescriptions/${username}`, {
  //         method: "GET",
  //       });
  //       if (!res.ok) {
  //         throw new Error('No response');
  //       }
  //       const pData = await res.json();
  //       console.log(pData);

  //       if (pData) {
  //         setData(pData);
  //         setShownData(shownData)
  //       }
  //     } catch (error) {
  //       console.error('No fetch:', error);
  //     }

  //   }
  //   fetchData();
  // }, []);

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

  const updateLogStatus = async () => {
		try {
			const response = await api.post(`http://localhost:5001/api/update-prescription/`);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};


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
              {shownData && shownData.map((item) => (
                <>
                  <tr className="w-full text-left text-black border-t border-white odd:bg-white/60 even:text-white even:bg-[#0a0e1a]/40 hover:"> 
                    <td><input type="date" id="date" placeholder={item.date}></input>{item.date}</td>
                    <td><input type="text" id="patient_initials" className="px-2 py-3 w-1/4" placeholder={item.patient_initials}></input></td>
                    <td><input type="text" id="parx_code" className="px-2 py-3" placeholder={item.prescriber_code}></input></td>
                    <td className="px-2 py-3 w-1/8"><input type="checkbox" checked={item.discovery}/></td>
                    <td><input type="text" id="user" className="px-2 py-3" placeholder={item.user_type}></input></td>
                    <select className="py-3 w-3/4 truncate max-w-md text-black">
                      <option selected value={item.status} defaultValue={item.status} disabled>{item.status}</option>
                      <option value="Pa Not Logged">Pa Not Logged</option>
                      <option value="Pa Logged">Pa Logged</option>
                      <option value="Pr Not Logged">Pr Not Logged</option>
                      <option value="Pr Logged">Pr Logged</option>
                      <option value="Complete">Complete</option>
                      <option value="Complete with Discovery Pass">Complete with Discovery Pass</option>
                    </select>
                  </tr>
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