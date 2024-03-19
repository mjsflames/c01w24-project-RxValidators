// This function returns a Google Maps Link of directions to a location specified
function GetDirections(location) {
  // Encode the location to make it suitable for a URL
  const encodedLocation = encodeURIComponent(location);

  // Google Maps API endpoint for directions
  const apiEndpoint = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  return apiEndpoint;
}

function GetLocation(latitude, longitude) {
  // Make a request to the Geocoding API
  var requestOptions = {
    method: "GET",
  };

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${
      import.meta.env.VITE_GEOAPIFY
    }`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function GetNearbyPlaces(location, latitude, longitude) {
  var requestOptions = {
    method: "GET",
  };

  fetch(
    `https://api.geoapify.com/v2/places?categories=${location}&filter=rect:${longitude},${latitude},${
      longitude + 0.04
    },${latitude - 0.04}&limit=20&apiKey=${import.meta.env.VITE_GEOAPIFY}`
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// Example usage:
// const location = "Times Square, New York";
// const directionsLink = GetDirections(location);
// console.log("Directions link:", directionsLink);

const latitude = 43.6482;
const longitude = -79.3833;
// const result = GetLocation(latitude, longitude);
// console.log("Location:", result);

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

const categoriesForApi = [];
console.log(categoriesForApi);
const place = "leisure.park";
const nearbyPlaces = GetNearbyPlaces(place, latitude, longitude);
console.log("Nearby Places:", nearbyPlaces);
