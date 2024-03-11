import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import pinIcon from "../../assets/location_pin.png";
// import "https://js.arcgis.com/4.24/esri/themes/light/main.css";

const ArcGISMap = () => {
  const mapRef = useRef(null);

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
        const map = new Map({
          basemap: "streets-navigation-vector",
        });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-79.347015, 43.65107], // Toronto's coordinates
          zoom: 12,
        });

        const searchWidget = new Search({
          view: view,
        });

        view.ui.add(searchWidget, {
          position: "top-right",
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        view.on("click", function (event) {
          const point = new Point({
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude,
          });

          const pinSymbol = new PictureMarkerSymbol({
            url: pinIcon,
            width: "24px",
            height: "24px",
          });

          const markerGraphic = new Graphic({
            geometry: point,
            symbol: pinSymbol,
          });

          graphicsLayer.add(markerGraphic);

          //   const coordinates =
          //     "Longitude: " +
          //     point.longitude.toFixed(4) +
          //     ", Latitude: " +
          //     point.latitude.toFixed(4);
          //   alert("Location added:\n" + coordinates);
        });

        const locateWidget = new Locate({
          view: view,
        });

        view.ui.add(locateWidget, {
          position: "top-left",
        });
      }
    );
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default ArcGISMap;
