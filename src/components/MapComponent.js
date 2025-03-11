import React, { useEffect, useState } from "react";
import L from "leaflet";

const MapComponent = ({ start, destination, transportMode }) => {
  const [mapView, setMapView] = useState("standard");
  const [startCity, setStartCity] = useState("Fetching...");
  const [destinationCity, setDestinationCity] = useState("Fetching...");

  // Function to get the city name from latitude and longitude
  const getCityName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      if (data && data.address) {
        return data.address.city || data.address.town || data.address.village || "Unknown Location";
      } else {
        return "Unknown Location";
      }
    } catch (error) {
      console.error("Error getting city name:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    // Fix for map container already initialized error
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    // Create a new map instance
    const map = L.map("map").setView(start, 13);

    // Blue Marker Icon for Start
    const blueIcon = new L.Icon({
      iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Red Marker Icon for Destination
    const redIcon = new L.Icon({
      iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Map Tile Layers
    const tileLayers = {
      standard: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      topo: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
      toner: "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      dark: "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
      watercolor: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    };

    // Add Tile Layer based on selected view
    L.tileLayer(tileLayers[mapView], {
      attribution:
        mapView === "topo"
          ? '&copy; OpenTopoMap, SRTM | Map data &copy; OpenStreetMap contributors'
          : mapView === "watercolor"
          ? '&copy; Esri, USGS, NOAA'
          : '&copy; OpenStreetMap contributors | CartoDB',
    }).addTo(map);

    // Fetch city names for start and destination
    const fetchCityNames = async () => {
      const startCityName = await getCityName(start[0], start[1]);
      const destinationCityName = await getCityName(destination[0], destination[1]);

      setStartCity(startCityName);
      setDestinationCity(destinationCityName);
    };

    fetchCityNames();

    // Add Start Marker (Blue)
    L.marker(start, { icon: blueIcon })
      .addTo(map)
      .bindPopup(`Start Location: ${startCity}`)
      .openPopup();

    // Add Destination Marker (Red)
    L.marker(destination, { icon: redIcon })
      .addTo(map)
      .bindPopup(`Destination: ${destinationCity}`);

    // Fetch Route
    const fetchRoute = async () => {
      try {
        const profile = transportMode === "driving" ? "car" : transportMode;
        const routeURL = `https://realtime-map-o0ct.onrender.com/route?profile=${profile}&startLng=${start[1]}&startLat=${start[0]}&destLng=${destination[1]}&destLat=${destination[0]}`;

        const response = await fetch(routeURL);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates;
          const latLngs = coordinates.map(([lng, lat]) => [lat, lng]);

          const distance = (route.distance / 1000).toFixed(2);
          const hours = Math.floor(route.duration / 3600);
          const minutes = Math.floor((route.duration % 3600) / 60);
          const duration = hours > 0 ? `${hours} hrs ${minutes} mins` : `${minutes} mins`;

          const polyline = L.polyline(latLngs, { color: "blue" }).addTo(map);
          map.fitBounds(polyline.getBounds());

          L.popup()
            .setLatLng(latLngs[0])
            .setContent(`Distance: ${distance} km<br>Duration: ${duration}`)
            .openOn(map);
        } else {
          alert("No route data available");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();

    return () => {
      map.remove();
    };
  }, [start, destination, transportMode, mapView, startCity, destinationCity]);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>From: {startCity} - To: {destinationCity}</h3>
      <select
        value={mapView}
        onChange={(e) => setMapView(e.target.value)}
        style={{
          margin: "10px",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="standard">Standard View</option>
        <option value="topo">Topographic View</option>
        <option value="toner">Toner View</option>
        <option value="dark">Dark View</option>
        <option value="watercolor">Watercolor View</option>
      </select>

      <div
        id="map"
        style={{ height: "500px", width: "100%", margin: "20px auto", borderRadius: "8px" }}
      />
    </div>
  );
};

export default MapComponent;
