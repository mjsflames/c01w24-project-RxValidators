import React, { useState } from "react";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");

  const places = ["Parks","Botanical Gardens", "Bike Rentals", "Ecology Centres", "Museums"  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    places.filter((place) => {
      return place.match(searchInput);
    });
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
};

export default Searchbar;
