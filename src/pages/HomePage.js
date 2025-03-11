import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapComponent({ center }) {
  const map = useMap();
  map.setView(center, 13); // Update the map center dynamically
  return null;
}

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState([18.5204, 73.8567]); // Default center (India)

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setLocation([lat, lon]);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* <h1>Real-Time Location Map</h1> */}
      <input
        type="text"
        placeholder="Search location..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginRight: "8px", padding: "5px", width: "300px" , marginTop: "10px" , fontSize:'20px'}}
      />
      <button onClick={handleSearch} style={{ padding: "5px 10px" }}>Search</button>
      <MapContainer
        center={location}
        zoom={13}
        style={{ height: "500px", width: "80%", margin: "20px auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapComponent center={location} />
        <Marker position={location}>
          <Popup>Marker at {searchText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HomePage;
