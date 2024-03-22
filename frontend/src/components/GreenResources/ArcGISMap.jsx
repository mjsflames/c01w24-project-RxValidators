import React, { useRef, useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import pinIcon from "../../assets/location_pin.png";
import currentPinIcon from "../../assets/current_loc_pin.png";
import { Link } from "react-router-dom";
import ScrapedData from "./ScrapedData";
import GetImage from "./GetImage";

const ArcGISMap = (category) => {
  const mapRef = useRef(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [location, setLocation] = useState("");
  const [googleMapsDirections, setGoogleMapsDirections] = useState("");
  const [placesList, setPlaceList] = useState([]);
  const [site, setSite] = useState("");
  const [names, setNames] = useState("");
  const [updatingCategory, setUpdatingCategory] = useState(false);

  const [pinAtPointRef, setPinAtPointRef] = useState(
    (longitude, latitude, currentPinSymbol = null, useCurrentPin = false) => {}
  );
  const [clearPinsRef, setClearPinsRef] = useState(null);
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

        const pinAtPoint = (
          longitude,
          latitude,
          symbol = pinSymbol,
          useCurrentPin = false
        ) => {
          const geometry = new Point({
            longitude: longitude,
            latitude: latitude,
          });

          const chosenSymbol = useCurrentPin ? currentPinSymbol : symbol;
          const pinGraphic = new Graphic({ geometry, symbol: chosenSymbol });

          graphicsLayer.add(pinGraphic);
          return geometry;
        };

        const clearPins = () => {
          graphicsLayer.removeAll();
        };

        // Make function accessible outside of this block.
        setPinAtPointRef(() => pinAtPoint);
        setClearPinsRef(() => clearPins);

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
          clearPins();
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
        setUpdatingCategory(false);
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
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setPlaceList([]);
    if (!location) return setNames("No Location Selected");

    setNames(location.features[0].properties.address_line1);
    setGoogleMapsDirections(getDirections(names));
    getNearbyPlaces(Number(latitude), Number(longitude));
  }, [location]);

  useEffect(() => {
    setSite("")
    if (!location) return;
    // Check if the location name exists in placesList and set setSite
    setGoogleMapsDirections(getDirections(names));
    const foundPlace = placesList.find((place) => {
      return place.simpleAddress === names;
    });
    console.log("PARTIAL ADDRESS FOUND: ", foundPlace);
    if (foundPlace && foundPlace.website !== null) {
      setSite(foundPlace.website);
      console.log("WEBSITE FOUND: ", foundPlace.website);
    }
  }, [names, placesList]);

  useEffect(() => {
    if (!category.category) return;
    setUpdatingCategory(true);
    // Remove previous category pins
    clearPinsRef();
    // Return the pointer pin
    pinAtPointRef(longitude, latitude, null, true); //? Uhh... so anyways
    setPlaceList([]);
    getNearbyPlaces(Number(latitude), Number(longitude));
  }, [category]);

  useEffect(() => {
    if (placesList.length === 0) return;
    placesList.forEach(({ lat, lon }) => {
      pinAtPointRef(lon, lat);
    });
  }, [placesList]);

  const formatList = (list) => {
    if (!location || !category.category) {
      return (
        <li>No nearby places. Please select a location and a category.</li>
      );
    }
    if (updatingCategory) return <li>Loading...</li>;

    if (list.length === 0 && category) {
      return <li>No nearby places. Please select a different category.</li>;
    }

    return list.map(({ partialAddress }) => (
      <li key={partialAddress}>
        <span>&#8226;</span> {partialAddress}
      </li>
    ));
  };

  return (
    <>
      <div className="flex gap-6 pb-10 pt-4">
        <div className="w-[60vw] h-[70vh] flex-row">
          <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
          <h3 className="font-bold text-lg pt-5">Selected Location:</h3>
          <h3 className="text-m">{names}</h3>
          {googleMapsDirections && <h3 className="font-bold text-lg pt-4">Directions:</h3>}
          <Link
            to={googleMapsDirections}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            <h3 className="text-m break-words">{googleMapsDirections}</h3>
          </Link>

          {/* <ScrapedData websiteUrl="https://www.toronto.ca/data/parks/prd/facilities/complex/93/index.html" /> */}
          <h3 className="font-bold text-lg pt-4">Description:</h3>
          <ScrapedData websiteUrl={site} />
          {googleMapsDirections && <GetImage selectedImage={names}/>}
        </div>

        <div className="bg-[#bbbbbb] px-10 w-[30vw]">
          <h3 className="font-bold text-xl pt-6">List of Nearby Places:</h3>
          <ol className="pb-6">{formatList(placesList)}</ol>
        </div>
      </div>
    </>
  );
};

export default ArcGISMap;
