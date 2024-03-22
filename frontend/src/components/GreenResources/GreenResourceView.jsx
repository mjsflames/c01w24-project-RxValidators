import React from 'react'

import { Link } from "react-router-dom";
import ScrapedData from "./ScrapedData";
import GetImage from "./GetImage";
import { getDirections } from '../../pages/GreenResources';

const GreenResourceView = ({data, close}) => {
// const simpleAddress = place.properties.address_line1;
// const addressParts = place.properties.formatted.split(",");
// const partialAddress = addressParts.slice(0, 2).join(", ");
// const lat = place.properties.lat;
// const lon = place.properties.lon;
// const website = place.properties.website;
// return { simpleAddress, partialAddress, lat, lon, website };
    // const {directions} = data;
    const names = data["simpleAddress"]
    const site = data["website"]
    const directions = getDirections(names);

    return (
        <div className='h-full absolute z-10 p-4 bg-white overflow-y-scroll'>
            <button className='' onClick={close}>Back</button>
            <h3 className="font-bold text-lg pt-5">Selected Location:</h3>
            <h3 className="text-m">{names}</h3>
            {directions && <h3 className="font-bold text-lg pt-4">Directions:</h3>}
            <GetImage className="h-1/2 w-full" selectedImage={names}/>
            {directions && <Link
                to={directions}
                target="_blank"
                className="text-blue-600 hover:underline"
            >
            <h3 className="text-m break-words">Directions (Redirect to Google Maps)</h3>
            </Link>
            }
            {/* <ScrapedData websiteUrl="https://www.toronto.ca/data/parks/prd/facilities/complex/93/index.html" /> */}
            <h3 className="font-bold text-lg pt-4">Description:</h3>
            <ScrapedData websiteUrl={site} />
        </div>
    )
}

export default GreenResourceView