import React from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface IMap extends MapContainerProps {
  height?: string;
}

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid2lsbGlhbXRjYXN0cm8iLCJhIjoiY2tvMHR2cHYxMGc3NDJvdGRuZnc2bHd5aCJ9.C6Q667Xs9ZUGI1OhI88uwQ";

const Map: React.FC<IMap> = (bounds) => {
  return (
    <MapContainer
      center={bounds.center}
      zoom={14}
      zoomControl={false}
      dragging={false}
      attributionControl={false}
      doubleClickZoom={false}
      touchZoom={false}
      scrollWheelZoom={false}
      boxZoom={false}
      keyboard={false}
      style={{ width: "100%", height: bounds.height, borderRadius: "14px", maxWidth: "696px" }}
    >
      {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`}
      />
    </MapContainer>
  );
};

export default Map;
