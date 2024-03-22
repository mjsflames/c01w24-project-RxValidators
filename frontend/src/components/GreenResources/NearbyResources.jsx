import React from 'react'

const NearbyResources = ({
    category, 
    location, 
    updatingCategory,
    list, 
    setSelectedResource}) => {
    if (!location || !category) {
        return (
        <li>No nearby places. Please select a location and a category.</li>
        );
    }

    if (updatingCategory) return <li>Loading...</li>;

    if (list.length === 0 && category) {
        return <li>No nearby places. Please select a different category.</li>;
    }

    return list.map((data) => {
        const {partialAddress} = data;

        return <li key={partialAddress} 
            onClick={() => setSelectedResource(data)}
            className='bg-[#ededed] odd:bg-[#d8d8d8] py-4 px-4
        hover:bg-[#91AB65] hover:text-white'>
        <p className='select-none'>{partialAddress}</p>
        </li>
    });
}

export default NearbyResources