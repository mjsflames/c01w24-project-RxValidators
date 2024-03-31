import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import ArcGISMap from "../components/GreenResources/ArcGISMap";
import PageHeader from "../components/PageHeader";
import ContentContainer from "../components/ContentContainer";
import NearbyResources from "../components/GreenResources/NearbyResources";

import GreenResourceView from "../components/GreenResources/GreenResourceView";

export const getDirections = (location) => {
  if (!location) return;
  const encodedLocation = encodeURIComponent(location);
  const apiEndpoint = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
  return apiEndpoint;
};

const GreenResources = () => {
  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [clicked, setClicked] = useState(true);
  const placeListState = useState([]);
  const categoryState = useState("");
  const locationState = useState("")
  const googleMapsState = useState("");
  const nameState = useState("");
  
  const [names, setNames] = nameState;
  const [googleMapsDirections, setGoogleMapsDirections] = googleMapsState;
  const [site, setSite] = useState("");
  const [location, setLocation] = locationState;
  const [category, setCategory] = categoryState;
  const [placesList, setPlaceList] = placeListState;
  const [selectedResource, setSelectedResource] = useState(null);

  const categories = {
    "Free Parks": "leisure.playground,leisure.park",
    "National Parks": "national_park",
    "Beaches": "beach",
    "Bicycle Rentals": "rental.bicycle",
    "Bicycle Parking": "parking.bicycles",
    "Car Parking": "parking.cars",
    "Museums": "entertainment.museum",
    "Zoos": "entertainment.zoo",
    "Theme Parks": "entertainment.theme_park",
    "Forests": "natural.forest",
    "Conservation Areas": "natural.protected_area",
    "Community Centres": "activity.community_center",
    "Washrooms": "amenity.toilet",
    "Public Transport": "public_transport",
  };



  // TODO: REFACTOR INTO GREENRESOURCEVIEW
  // ? Get site information
  useEffect(() => {
    setSite("")
    if (!location) return;
    // Check if the location name exists in placesList and set setSite
    setGoogleMapsDirections(getDirections(names));
    const foundPlace = placesList.find((place) => place.simpleAddress === names);
    if (foundPlace && foundPlace.website !== null) setSite(foundPlace.website);
  }, [names, placesList]);

  return (
    <>
      <PageHeader
        title="Green Resources"
        desc="To look at green spaces near you, enter an address or allow this site to access your current location, then select a category."
      />
      <ContentContainer>

        {/* List the categories */}
        <div className="my-2 flex flex-wrap gap-2">
        <h2 className="font-semibold text-lg">Categories:</h2>
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              className={`p-0.5 pl-1 pr-1 rounded-md text-center border border-black hover:bg-[#A2BE99] transition-all ${
                category == categories[key] && "!bg-[#A2BE99]"
              }`}
              onClick={() => {
                setCategory(categories[key]);
                setClicked(true);
              }}
            >
              {key}
            </button>
          ))}
        </div>

      <div className="flex h-[50vh] mt-4 gap-6 relative mb-8">
          <ArcGISMap
            className={"w-2/3 h-full flex"} 
            categoryState={categoryState}
            placeListState={placeListState}
            locationState={locationState}
            googleMapsState={googleMapsState}
            nameState={["", () => {}]}
            setUpdatingCategory={setUpdatingCategory}
          />
          <div className="w-[30vw] flex flex-col">
            <div className="flex flex-col bg-[#77996C]">
              <h3 className="font-bold text-xl m-4">Nearby Resources <span className="text-sm font-normal">({placesList.length} Results)</span></h3>
              
            </div>

            {selectedResource &&
              <GreenResourceView data={
                {
                  ...selectedResource,
                  direction: googleMapsDirections,
                  names:names,
                  site: site
                }}
                close={() => setSelectedResource(null)}
                /> 
              }

            <ul className="pb-6 flex-1 overflow-scroll w-[30vw] bg-[#b8b8b8] text-lg">
              <NearbyResources 
                category={category} 
                location={location}
                updatingCategory={updatingCategory}
                list={placesList}
                setSelectedResource={setSelectedResource}
              /></ul>
          </div>
      </div>
      </ContentContainer>
    </>
  );
};

export default GreenResources;
