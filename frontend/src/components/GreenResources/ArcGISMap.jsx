import React, { useRef, useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import pinIcon from "../../assets/location_pin.png";
import currentPinIcon from "../../assets/current_loc_pin.png";
import { getDirections } from "../../pages/GreenResources";

const ArcGISMap = ({className, categoryState, placeListState, locationState, googleMapsState, nameState, setUpdatingCategory}) => {
  const mapRef = useRef(null);
  // const category, placesList, setUpdatingCategory, setPlaceList
  const [category, setCategory] = categoryState;
  const [placesList, setPlaceList] = placeListState;
  const [names, setNames] = nameState;
  const [googleMapsDirections, setGoogleMapsDirections] = googleMapsState;
  const [location, setLocation] = locationState;
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [pinAtPointRef, setPinAtPointRef] = useState(
    (longitude, latitude, currentPinSymbol = null, useCurrentPin = false) => {}
  );

  const [clearPinsRef, setClearPinsRef] = useState(() => {});

  // ? Load ESRI Module
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
    ]).then(onESRI_ModuleLoaded)
    .catch(error => console.log(error));
  }, []);

  // ? Look for nearby locations
  useEffect(() => {
    setPlaceList([]);
    if (!location) return setNames("No Location Selected");

    setNames(location.features[0].properties.address_line1);
    setGoogleMapsDirections(getDirections(names));
    getNearbyPlaces(Number(latitude), Number(longitude));
  }, [location]);

  // ? On category change, remove pins and find nearby places.
  useEffect(() => {
    if (!category) return;
    setUpdatingCategory(true);
    // Remove previous category pins
    clearPinsRef();
    // Return the pointer pin
    pinAtPointRef(longitude, latitude, null, true); //? Uhh... so anyways
    setPlaceList([]);
    getNearbyPlaces(Number(latitude), Number(longitude));
  }, [category]);

  // ? On places retrieved, pin relevant areas near me
  useEffect(() => {
    if (placesList.length === 0) return;
    placesList.forEach(({ lat, lon }) => pinAtPointRef(lon, lat));
  }, [placesList]);


  function onESRI_ModuleLoaded([
  Map,
  MapView,
  Search,
  Locate,
  Graphic,
  Point,
  PictureMarkerSymbol,
  GraphicsLayer,
  ]) {

  const map = new Map({ basemap: "streets-navigation-vector" });
  const view = new MapView({
    container: mapRef.current,
    map: map,
    center: [-79.3833, 43.6482], // Toronto's coordinates
    zoom: 12,
  });

  const searchWidget = new Search({ view: view, popupEnabled: false });
  const graphicsLayer = new GraphicsLayer();

  const locateWidget = new Locate({ view: view });
  map.add(graphicsLayer);
  view.ui.add(searchWidget, {position: "top-right"});
  view.ui.add(locateWidget, {position: "top-left"});

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

  const pinAtPoint = (
    longitude,
    latitude,
    symbol = pinSymbol,
    useCurrentPin = false
  ) => {
    const geometry = new Point({longitude, latitude});

    const chosenSymbol = useCurrentPin ? currentPinSymbol : symbol;
    const pinGraphic = new Graphic({ geometry, symbol: chosenSymbol });

    graphicsLayer.add(pinGraphic);
    return geometry;
  };

  const clearPins = () => graphicsLayer.removeAll();

  // Make function accessible outside of this block.
  setPinAtPointRef(() => pinAtPoint);
  setClearPinsRef(() => clearPins);

  // On search widget returns a result
  // ? Output a pin on the map and search
  searchWidget.on("select-result", (event) => {
    const { longitude, latitude } = event.result.feature.geometry;
    const selectedPoint = pinAtPoint(longitude, latitude, currentPinSymbol);
    setLongitude(selectedPoint.longitude.toFixed(4));
    setLatitude(selectedPoint.latitude.toFixed(4));
    fetchLocation(
      selectedPoint.latitude.toFixed(4),
      selectedPoint.longitude.toFixed(4)
    );
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
  }

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

  const getNearbyPlaces = (latitude, longitude) => {
    if (!category) return;
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      `https://api.geoapify.com/v2/places?categories=${
        category
      }&filter=rect:${longitude - 0.03},${latitude - 0.03},${
        longitude + 0.03
      },${latitude + 0.03}&limit=20&apiKey=${import.meta.env.VITE_GEOAPIFY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
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

  return (
    <>
      <div className={className}>
        <div className="w-full h-full flex-row">
          <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </>
  );
};

export default ArcGISMap;
