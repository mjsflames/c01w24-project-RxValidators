import React from "react";

import { Link } from "react-router-dom";
import ScrapedData from "./ScrapedData";
import GetImage from "./GetImage";
import { getDirections } from "../../pages/GreenResources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDirections } from "@fortawesome/free-solid-svg-icons";

const GreenResourceView = ({ data, close }) => {
  // const simpleAddress = place.properties.address_line1;
  // const addressParts = place.properties.formatted.split(",");
  // const partialAddress = addressParts.slice(0, 2).join(", ");
  // const lat = place.properties.lat;
  // const lon = place.properties.lon;
  // const website = place.properties.website;
  // return { simpleAddress, partialAddress, lat, lon, website };
  // const {directions} = data;
  const names = data["simpleAddress"];
  const partialAddress = data["partialAddress"];
  const site = data["website"];
  const directions = getDirections(names);

  return (
    <div className="w-[30vw] h-full absolute z-10 bg-[#dad6d6] overflow-y-scroll">
      <div className="bg-[#77996C] p-4">
        <button
          className="flex gap-2 items-center rounded text-white hover:text-black pb-2"
          onClick={close}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>Back</p>
        </button>
        <h3 className="font-bold text-lg">Selected Location:</h3>
        <h3 className="text-lg">{partialAddress}</h3>
      </div>
      <GetImage
        className="h-[15vw] w-full bg-white"
        selectedImage={partialAddress}
      />
      <div className="px-6 text-wrap pb-8">
        <div className="pb-4">
            <h3 className="font-bold text-lg pt-4">Description:</h3>
            <ScrapedData websiteUrl={site} />
        </div>
            <Link
                to={directions}
                target="_blank"
                className="text-m select-none text-inherit"
            >
            <div className="flex gap-2 items-center bg-[#3B5998] p-2 w-[15vw] text-center text-white rounded hover:bg-[#ffffff] hover:text-black transition-all">
                {/* {directions && <h3 className="font-bold text-lg pt-4 ">Directions:</h3>} */}
                <FontAwesomeIcon icon={faDirections} />
                <h3>Directions (Redirect to Google Maps)</h3>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default GreenResourceView;
