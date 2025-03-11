const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/route", async (req, res) => {
    const { profile, startLng, startLat, destLng, destLat } = req.query;
    const osrmUrl = `https://router.project-osrm.org/route/v1/${profile}/${startLng},${startLat};${destLng},${destLat}?geometries=geojson&overview=full`;

    try {
        const response = await axios.get(osrmUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching route:", error.message);
        res.status(500).json({ error: "Failed to fetch route" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
