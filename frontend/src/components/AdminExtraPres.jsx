import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const AdminExtraPres = ({ item }) => {
  const [data, setData] = useState(item);
  const [newItem, setNewItem] = useState(item);

  useEffect(() => {
    console.log(item);
    setData(item);
  }, []);

  const userData = [
    { key: "First Name", value: "firstName" },
    { key: "Last Name", value: "lastName" },
    { key: "Address", value: "address" },
    { key: "City", value: "city" },
    { key: "Province", value: "province" },
    { key: "Email", value: "email" },
    { key: "Language", value: "language" },
    { key: "Provider Code", value: "providerCode" },
    { key: "Licensing College", value: "college" },
    { key: "Profession", value: "profession" },
    { key: "License #", value: "license" }
  ];

  const changeItem = (key, newValue) => {
    newItem[key] = newValue;
    setNewItem(newItem);
  };

  function updateData() {
    api.patch(`/auth/updateUser/${data.username}`, newItem).then((res) => {
      console.log(res.data);
      setData(newItem);
    }).catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <>
      <div></div>
      <div>
        {data && (
          <table className="rounded-lg font-bold w-full">
            <tbody>
              {userData.map(({ key, value }) => (
                <tr key={key}>
                  <td className="w-2/3 px-2 align-top">{key}:</td>
                  <td className="w-1/3 px-2">
                    <input onChange={(e) => changeItem(value, e.target.value)} placeholder={data[value]} className="bg-slate-400 bg-opacity-20 text-black p-1 rounded-md placeholder-slate-800 placeholder-opacity-80 w-full"></input></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-end p-3">
        <button onClick={() => updateData()} className="border border-black rounded-md font-semibold w-1/10 hover:font-bold">Update</button>
        </div>
    </>
  );
};

export default AdminExtraPres;
