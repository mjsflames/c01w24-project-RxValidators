import React, { useState, useEffect } from "react";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import api from "../axiosConfig";

const AdminPatientProfile = () => {
  const [data, setData] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      address: "123 Main St"
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      address: "456 Elm St"
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      address: "789 Oak St"
    }
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/auth/listPatients");
        console.log("Fetch response", res.data);
        if (res.status !== 200) {
          console.log("Fetch failed");
        }
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }

    }
    fetchData();
  }, []);

  return (
    <>
      <PageHeader
        title="Patient Profiles"
        desc="Below is a list of all patient profiles!"
      />

      <ContentContainer>
        <div className="justify-center flex w-full">
          <table className="mt-10 mb-20 text-sm rtl:text-right text-gray-500 justify-center w-4/5">
            <thead className="text-xs text-left text-black uppercase bg-[#f0fff0]">
              <tr>
                <th scope="col" className="px-2 py-3">Email</th>
                <th scope="col" className="px-2 py-3">First Name</th>
                <th scope="col" className="px-2 py-3">Last Name</th>
                <th scope="col" className="px-2 py-3">Address</th>

              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <>
                  <tr className="text-left text-black border-t border-white odd:bg-white/60 even:text-white even:bg-PaRxDGrenn hover:opacity-100 opacity-80">
                    <td className="px-2 py-3">{item.email}</td>
                    <td className="px-2 py-3">{item.firstName}</td>
                    <td className="px-2 py-3">{item.lastName}</td>
                    <td className="px-2 py-3 truncate max-w-md">{item.address}</td>
                  </tr>
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