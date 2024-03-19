import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import ArcGISMap from "../components/GreenResources/ArcGISMap";
import PageHeader from "../components/PageHeader";
import ContentContainer from "../components/ContentContainer";

const GreenResources = () => {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(false);
  const categories = {
    "Free Parks": "leisure.playground,leisure.park",
    "National Parks": "national_park",
    Beaches: "beach",
    "Bicycle Rentals": "rental.bicycle",
    "Bicycle Parking": "parking.bicycles",
    "Car Parking": "parking.cars",
    Museums: "entertainment.museum",
    Zoos: "entertainment.zoo",
    "Theme Parks": "entertainment.theme_park",
    Forests: "natural.forest",
    "Conservation Areas": "natural.protected_area",
    "Community Centres": "activity.community_center",
    Washrooms: "amenity.toilet",
    "Public Transport": "public_transport",
  };

  const buttonCategories = (value) => {
    console.log(value);
    setCategory(value);
    setClicked(true);
  };

  const handleAddress = (value) => {
    setAddress(value);
  };
  const handlePostalCode = (value) => {
    setPostalCode(value);
  };
  const handleSubmit = () => {
    console.log("Address:", address);
    console.log("Postal Code:", postalCode);
  };

  return (
    <>
      <PageHeader
        title="Green Resources"
        desc="To look at resources near you, please enter an address or a city to start your search, or allow this site to access your current location."
      />
      <ContentContainer>
        {/* <form onSubmit={handleSubmit} className="flex">
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => handleAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => handlePostalCode(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form> */}

        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              className={`p-0.5 pl-1 pr-1 rounded-md text-center border border-black hover:bg-[#A2BE99] transition-all ${
                category == categories[key] && "!bg-[#A2BE99]"
              }`}
              onClick={() => buttonCategories(categories[key])}
            >
              {key}
            </button>
          ))}
        </div>

        <ArcGISMap category={category} />
      </ContentContainer>
    </>
  );
};

export default GreenResources;
