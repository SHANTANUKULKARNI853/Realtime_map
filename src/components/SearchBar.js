import React, { useState } from "react";
import "./../styles/searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");

  // Swap the start and destination values
  const handleSwap = () => {
    setStartLocation((prev) => [destination, setDestination(prev)][0]);
  };

  // Handle search button click
  const handleSearch = () => {
    if (startLocation && destination) {
      onSearch(startLocation, destination);
    } else {
      alert("Please enter both locations!");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Start Location"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
      />
      <button onClick={handleSwap} className="swap-btn">🔄</button>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleSearch} className="search-btn">Search</button>
    </div>
  );
};

export default SearchBar;
