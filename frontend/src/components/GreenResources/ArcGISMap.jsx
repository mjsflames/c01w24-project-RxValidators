import React, { useRef, useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import pinIcon from "../../assets/location_pin.png";
import currentPinIcon from "../../assets/current_loc_pin.png";
import { Link } from "react-router-dom";
import ScrapedData from "./ScrapedData";
import GetImages from "./GetImages";

const ArcGISMap = (category) => {
  const mapRef = useRef(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [location, setLocation] = useState("");
  const [googleMapsDirections, setGoogleMapsDirections] = useState("");
  const [placesList, setPlaceList] = useState([]);
  const [site, setSite] = useState("");
  const [names, setNames] = useState("");

  const [pinAtPointRef, setPinAtPointRef] = useState(null);
  // Load ESRI Module
  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Search",
      "esri/widgets/Locate",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/symbols/PictureMarkerSymbol",
      "esri/layers/GraphicsLayer",
    ]).then(
      ([
        Map,
        MapView,
        Search,
        Locate,
        Graphic,
        Point,
        PictureMarkerSymbol,
        GraphicsLayer,
      ]) => {
        const map = new Map({ basemap: "streets-navigation-vector" });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-79.3833, 43.6482], // Toronto's coordinates
          zoom: 12,
        });

        const pinSymbol = new PictureMarkerSymbol({
          url: pinIcon,
          width: "24px",
          height: "24px",
        });

        const currentPinSymbol = new PictureMarkerSymbol({
          url: currentPinIcon,
          width: "24px",
          height: "24px",
        });

        const searchWidget = new Search({ view: view, popupEnabled: false });

        const pinAtPoint = (longitude, latitude, symbol = pinSymbol) => {
          const geometry = new Point({
            longitude: longitude,
            latitude: latitude,
          });

          const pinGraphic = new Graphic({ geometry, symbol });

          graphicsLayer.add(pinGraphic);
          return geometry;
        };

        // Make function accessible outside of this block.
        setPinAtPointRef(() => pinAtPoint);

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        // When the search widget returns a result
        searchWidget.on("select-result", (event) => {
          const { longitude, latitude } = event.result.feature.geometry;
          const selectedPoint = pinAtPoint(
            longitude,
            latitude,
            currentPinSymbol
          );
          setLongitude(selectedPoint.longitude.toFixed(4));
          setLatitude(selectedPoint.latitude.toFixed(4));
          fetchLocation(
            selectedPoint.latitude.toFixed(4),
            selectedPoint.longitude.toFixed(4)
          );
        });

        view.ui.add(searchWidget, {
          position: "top-right",
        });

        view.on("click", function (event) {
          // Clear existing pins on click
          graphicsLayer.removeAll();

          const { longitude, latitude } = event.mapPoint;

          const point = pinAtPoint(longitude, latitude, currentPinSymbol);

          setLongitude(point.longitude.toFixed(4));
          setLatitude(point.latitude.toFixed(4));
          fetchLocation(point.latitude.toFixed(4), point.longitude.toFixed(4));
        });

        const locateWidget = new Locate({ view: view });

        view.ui.add(locateWidget, {
          position: "top-left",
        });
      }
    );
  }, []);

  const fetchLocation = async (latitude, longitude) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${
        import.meta.env.VITE_GEOAPIFY
      }`,
      requestOptions
    ).then((response) => response.json());
    setLocation(response);
  };

  const getDirections = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const apiEndpoint = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
    return apiEndpoint;
  };

  const getNearbyPlaces = (latitude, longitude) => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      `https://api.geoapify.com/v2/places?categories=${
        category["category"]
      }&filter=rect:${longitude - 0.03},${latitude - 0.03},${
        longitude + 0.03
      },${latitude + 0.03}&limit=20&apiKey=${import.meta.env.VITE_GEOAPIFY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("BOOOO: ", result);
        setPlaceList(
          result["features"].map((place) => {
            const simpleAddress = place.properties.address_line1;
            const addressParts = place.properties.formatted.split(",");
            const partialAddress = addressParts.slice(0, 2).join(", ");
            const lat = place.properties.lat;
            const lon = place.properties.lon;
            const website = place.properties.website;
            return { simpleAddress, partialAddress, lat, lon, website };
          })
        );
        // setLatitudeList(
        //   result["features"].map((place) => { return place.properties.lat })
        // );
        // setLongitudeList(
        //   result["features"].map((place) => { return place.properties.lon })
        // );
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setPlaceList([]);
    if (location) {
      setNames(location.features[0].properties.address_line1);
      setGoogleMapsDirections(getDirections(names));
      getNearbyPlaces(Number(latitude), Number(longitude));
    }
  }, [location]);

  useEffect(() => {
    if (!location) return;
    // Check if the location name exists in placesList and set setSite
    const foundPlace = placesList.find((place) => {
      console.log(place, names);
      return place.simpleAddress === names;
    });
    console.log("PARTIAL ADDRESS FOUND: ", foundPlace);
    if (foundPlace) {
      setSite(foundPlace.website | "");
      console.log("WEBSITE FOUND: ", foundPlace.website);
    }
  }, [names, placesList]);

  useEffect(() => {
    setPlaceList([]);
    getNearbyPlaces(Number(latitude), Number(longitude));
  }, [category]);

  useEffect(() => {
    if (placesList.length === 0) return;
    placesList.forEach(({ partialAddress, lat, lon, website }) => {
      pinAtPointRef(lon, lat);
      // if (names === partialAddress) {
      //   console.log("PARTIAL ADDRESS FOUND: ", partialAddress);
      //   console.log("WEBSITE FOUND: ", website);
      //   setSite(website)
      // }
    });
  }, [placesList]);

  const formatList = (list) => {
    return list.map(({ partialAddress }) => (
      <li key={partialAddress}>
        <span>&#8226;</span> {partialAddress}
      </li>
    ));
  };

  const handleLocateButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchLocation(position.coords.latitude, position.coords.longitude);

          mapView.goTo({
            target: [position.coords.longitude, position.coords.latitude],
            zoom: 12,
          });
          const pinGraphic = new Graphic({
            geometry: selectedPoint,
            symbol: currentPinSymbol,
          });

          const graphicsLayer = new GraphicsLayer();
          graphicsLayer.removeAll();
          graphicsLayer.add(pinGraphic);

          map.add(graphicsLayer);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <button
        onClick={handleLocateButtonClick}
        className="mt-4 bg-[#77996C] hover:bg-[#95a98f] text-black py-1 px-4 rounded"
      >
        Use My Location
      </button>
      <div className="flex gap-6 pb-10 pt-4">
        <div className="w-[60vw] h-[70vh]">
          <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
        </div>

        <div className="bg-[#bbbbbb] py-5 px-10 w-[30vw]">
          <h3 className="font-bold text-xl">Clicked Location:</h3>
          <h3 className="text-lg">{names}</h3>
          <h3 className="font-bold text-xl pt-6">List of Nearby Places:</h3>
          <ol>{formatList(placesList)}</ol>
          <h3 className="font-bold text-xl pt-6">Google Maps Link:</h3>
          <Link
            to={googleMapsDirections}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            <h3 className="text-lg break-words">{googleMapsDirections}</h3>
          </Link>
        </div>
      </div>
      {/* <ScrapedData websiteUrl="https://www.toronto.ca/data/parks/prd/facilities/complex/93/index.html" /> */}
      <ScrapedData websiteUrl={site} />
    </>
  );
};

export default ArcGISMap;
