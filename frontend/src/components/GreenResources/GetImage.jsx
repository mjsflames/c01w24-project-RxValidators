import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetImage = ({ selectedImage }) => {
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const searchImage = async () => {
      const subscriptionKey = `${import.meta.env.VITE_MS_AZURE_KEY}`;
      const searchUrl = "https://api.bing.microsoft.com/v7.0/images/search";
      const headers = { "Ocp-Apim-Subscription-Key": subscriptionKey };
      const params = { q: selectedImage, count: 1 };

      try {
        const response = await axios.get(searchUrl, { headers, params });
        const searchResults = response.data;

        if (searchResults.value && searchResults.value.length > 0) {
          const firstResult = searchResults.value[0];
          const imageUrl = firstResult.contentUrl;
          setImageURL(imageUrl);
          setError('');
        } else {
          setError("No images found for the location: " + selectedImage);
        }
      } catch (error) {
        setError("Error fetching images: " + error.message);
      }
    };

    if (selectedImage) {
      searchImage();
    }
  }, [selectedImage]);

  return (
    <div className="container mx-auto py-4">
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {imageURL && (
        <div className="mt-4">
          <img
            src={imageURL}
            alt="Search Result"
            className="w-65 h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default GetImage;
