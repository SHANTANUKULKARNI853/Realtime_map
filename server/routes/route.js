const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route to get the route data from OSRM
router.get("/route/:profile/:coordinates", async (req, res) => {
    const { profile, coordinates } = req.params;
    const osrmUrl = `https://router.project-osrm.org/route/v1/${profile}/${coordinates}?geometries=geojson&overview=full`;

    try {
        const response = await axios.get(osrmUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching route from OSRM:", error.message);
        res.status(500).json({ error: "Failed to fetch route" });
    }
});

module.exports = router;
