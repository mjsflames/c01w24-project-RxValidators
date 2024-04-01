import React, { useState, useEffect } from "react";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import api from "../axiosConfig";
import AdminExtraPatient from "../components/AdminExtraPatient";

const AdminPatientProfile = () => {
  const [data, setData] = useState(null);
  const [shownData, setShownData] = useState(null);
  const [myItem, setItem] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/auth/listPatients");
        console.log("Fetch response", res.data);
        if (res.status !== 200) {
          console.log("Fetch failed");
        }
        setData(res.data);
        setShownData(res.data)
        
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }

    }
    fetchData();
  }, []);

  const itemClick = (item) => {
    if (myItem !== item) {
      setItem(item);
    }
    else {
      setItem(null);
    }
  };

  useEffect(() => {
    async function filterData(filterString) {
        return data.filter(item => JSON.stringify(item).toLowerCase().includes(filterString));
    }

    async function fetchData() {
        const filteredData = await filterData(search.toLowerCase());
        setShownData(filteredData);
    }

    fetchData();
}, [search]);

const deleteHandler = async (username) => {
  try {
      const res = await api.delete(`/auth/removeUser/${username}`);
      window.location.reload();
  } catch (err) {
      setError(err.response);
      console.log(err.res)
  }
}


  return (
    <>
      <PageHeader
        title="Patient Profiles"
        desc="Below is a list of patient profiles."
      />

      <ContentContainer>
        <div className="mx-auto text-center">
          <h1 className="text-3xl underline font-bold !text-gray-900  mb-5">All Patient Profiles</h1>
          <p className="font-semibold">Start typing in the search bar to display all results that correspond with the search.</p>
          <p className="font-semibold">Click "Update Profile" to start editing a profile. Select an input box to start changing that field then click "Update"</p>
        </div>
        <div className="justify-center grid w-full grid-cols-1 place-items-center">
          <div className="w-full flex">
            <div className="w-1/10"></div>
            <input onChange={(e) => setSearch(e.target.value)} className="truncate p-1 rounded-md w-1/8 bg-white bg-opacity-65 border border-black" placeholder="Start Searching"></input>
          </div>
          <table className="mt-10 mb-20 text-sm rtl:text-right text-gray-500 w-4/5">
            <thead className="text-xs text-left text-white uppercase bg-PaRxDGrenn">
              <tr>
                <th scope="col" className="px-2 py-3 w-1/6">First Name</th>
                <th scope="col" className="px-2 py-3 w-1/6">Last Name</th>
                <th scope="col" className="px-2 py-3 w-1/4">Email</th>
                <th scope="col" className="px-2 py-3 w-1/3">Address</th>
                <th className="w-1/2 text-left px-2"></th> 
              </tr>
            </thead>
            <tbody>
              {shownData && shownData.map((item) => (

                <><tr className="w-full text-left text-black border-t border-black odd:bg-white even:text-black even:bg-[#f5deb3]">
                <td  colSpan="5"><table className="w-full">
                  <tr>
                    <td className="px-2 py-3 w-1/6">{item.firstName}</td>
                    <td className="px-2 py-3 w-1/6">{item.lastName}</td>
                    <td className="px-2 py-3 w-1/4">{item.email}</td>
                    <td className="px-2 py-3 max-w-md truncate text-wrap">{item.address}</td>
                    <td className="p-2 w-1/8 text-right"><button onClick={() => itemClick(item)}><p className="font-bold text-nowrap underline">Update Profile</p></button>
                      <button id="deletelog" onClick={() => setShowModal(true)} className="font-bold text-red-600 hover:text-red-700 underline text-center ml-5">
                            Delete   
                        </button>
                        {showModal ? (
                            <>
                                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-50">
                                    <div className="relative w-auto mx-auto">
                                        <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none px-10"> 
                                            <div className="flex items-start justify-between p-5">
                                                <h2 className="text-l font-bold mx-auto">Please Confirm Deletion</h2>
                                                <button className="bg-transparent text-black absolute right-2 top-0" onClick={() => setShowModal(false)}>X</button>
                                            </div>
                                            <div className="relative text-center flex-auto mb-5">
                                                <p>Are you sure you want to delete this profile?</p>
                                            </div>
                                            <div className="flex flex-row justify-center mb-5">
                                                <button id="deletelog" onClick={() => {deleteHandler(item.email)}} className="bg-green-200 hover:bg-green-200/40 text-black border rounded-full p-2.5 mr-10">Yes, proceed</button>
                                                <button className="bg-red-200 hover:bg-red-200/40 text-black border rounded-full p-2.5" onClick={() => setShowModal(false)}>No, cancel</button>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </>
                        ) : null}</td>
                  </tr>
                  {myItem === item && (<tr className="text-left border-t border-white">
                    <td colSpan="4">
                      <AdminExtraPatient item={item} />
                    </td>
                  </tr>
                  )}</table></td></tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </ContentContainer>
    </>
  );
};

export default AdminPatientProfile;