import React, { useState } from "react";

function GetImages() {
  const [query, setQuery] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&client_id=${
          import.meta.env.VITE_UNSPLASH
        }`
      );
      const data = await response.json();
      if (data.urls && data.urls.full) {
        setImageUrl(data.urls.full);
      } else {
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a word"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {imageUrl && (
        <img src={imageUrl} alt={query} style={{ maxWidth: "100%" }} />
      )}
    </div>
  );
}

export default GetImages;
