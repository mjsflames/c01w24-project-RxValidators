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


  return (
    <>
      <PageHeader
        title="Patient Profiles"
        desc="Below is a list of all patient profiles!"
      />

      <ContentContainer>
        <div className="justify-center grid w-full grid-cols-1 place-items-center">
          <div className="w-full flex">
            <div className="w-1/10"></div>
            <input onChange={(e) => setSearch(e.target.value)} className="truncate p-1 rounded-md w-1/8 bg-white bg-opacity-65 border border-black" placeholder={"Search Here"}></input>
          </div>
          <table className="mt-10 mb-20 text-sm rtl:text-right text-gray-500 w-4/5">
            <thead className="text-xs text-left text-black uppercase bg-[#f0fff0]">
              <tr>
                <th scope="col" className="px-2 py-3 w-1/6">First Name</th>
                <th scope="col" className="px-2 py-3 w-1/6">Last Name</th>
                <th scope="col" className="px-2 py-3 w-1/3">Email</th>
                <th scope="col" className="px-2 py-3 w-1/3">Address</th>

              </tr>
            </thead>
            <tbody>
              {shownData && shownData.map((item) => (

                <><tr className="w-full text-left text-black border-t border-white odd:bg-white/60 even:text-white even:bg-PaRxDGrenn hover:opacity-100 opacity-80">
                <td  colSpan="4" className="w-full"><table className="w-full">
                  <tr onClick={() => itemClick(item)}>
                    <td className="px-2 py-3 w-1/6">{item.firstName}</td>
                    <td className="px-2 py-3 w-1/6">{item.lastName}</td>
                    <td className="px-2 py-3 w-1/3">{item.email}</td>
                    <td className="px-2 py-3 max-w-md truncate">{item.address}</td>
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