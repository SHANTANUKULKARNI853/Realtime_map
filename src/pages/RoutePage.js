import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import { FaExchangeAlt } from 'react-icons/fa';

const RoutePage = () => {
    const [start, setStart] = useState([19.0760, 72.8777]); // Default to Mumbai
    const [destination, setDestination] = useState([28.7041, 77.1025]); // Default to Delhi
    const [transportMode, setTransportMode] = useState('driving');
    const [startLocation, setStartLocation] = useState(''); // Starting location as text
    const [destinationLocation, setDestinationLocation] = useState(''); // Destination location as text

    // Get current location on load
    useEffect(() => {
        const fetchCurrentLocation = async () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setStart([latitude, longitude]);
                        setStartLocation(`${latitude}, ${longitude}`);
                        console.log('Current Location Coordinates:', latitude, longitude);
                    },
                    (error) => {
                        console.error('Error fetching current location:', error);
                        alert('Unable to get current location. Please allow location access.');
                    }
                );
            } catch (error) {
                console.error('Error fetching IP-based location:', error);
            }
        };

        fetchCurrentLocation();
    }, []);

    const handleStartLocationChange = (e) => {
        setStartLocation(e.target.value);
    };

    const handleDestinationLocationChange = (e) => {
        setDestinationLocation(e.target.value);
    };

    const handleModeChange = (e) => {
        setTransportMode(e.target.value);
    };

    const handleSwap = () => {
        setStartLocation(destinationLocation);
        setDestinationLocation(startLocation);
        setStart(destination);
        setDestination(start);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const getCoordinates = async (location) => {
                const apiKey = 'b228f52afc77481ca1a62e31baa6147b';
                const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;
                const response = await fetch(url);
                const data = await response.json();
                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry;
                    return [lat, lng];
                } else {
                    throw new Error('Location not found');
                }
            };

            const startCoords = await getCoordinates(startLocation);
            const destinationCoords = await getCoordinates(destinationLocation);

            setStart(startCoords);
            setDestination(destinationCoords);
        } catch (error) {
            alert('Error fetching coordinates: ' + error.message);
        }
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Route Finder</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Current Location (or enter manually)"
                        value={startLocation}
                        onChange={handleStartLocationChange}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc', width: '250px', fontSize: '20px' }}
                    />
                    <FaExchangeAlt
                        onClick={handleSwap}
                        style={{ cursor: 'pointer', fontSize: '20px', transform: 'rotate(90deg)', transition: 'transform 0.3s ease' }}
                        title="Swap locations"
                    />
                    <input
                        type="text"
                        placeholder="Enter destination"
                        value={destinationLocation}
                        onChange={handleDestinationLocationChange}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc', width: '250px', fontSize: '20px' }}
                    />
                </div>
                <button type="submit" style={{ marginTop: '15px', padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
                    Find Route
                </button>
            </form>
            <MapComponent start={start} destination={destination} transportMode={transportMode} />
        </div>
    );
};

export default RoutePage;
