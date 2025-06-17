// components/CrimeMap.tsx
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";

// Marker type supports both crime and vigilante types
type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  type: "crime" | "vigilante";
  title: string;
  description: string;
};

// Icons for crime and vigilante
const crimeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const vigilanteIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Fit map to bounds based on all markers
function FitBounds({ markers }: { markers: MarkerData[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;

    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [markers, map]);

  return null;
}

export default function CrimeMap({ markers }: { markers: MarkerData[] }) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]} // fallback center (Lagos)
      zoom={11}
      scrollWheelZoom={true}
      className="h-96 w-full rounded-lg shadow border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds markers={markers} />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={marker.type === "crime" ? crimeIcon : vigilanteIcon}
        >
          <Popup>
            <strong>{marker.title}</strong>
            <br />
            {marker.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
