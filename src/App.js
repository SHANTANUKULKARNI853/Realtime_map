import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoutePage from "./pages/RoutePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
      <nav style={{ backgroundColor: "#333", padding: "10px", color: "white" }}>
  <h1 style={{ margin: "0" }}>Real-Time Location Map</h1>
  <div>
    <Link to="/" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>Home</Link>
    <Link to="/route" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>Route Finder</Link>
  </div>
</nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/route" element={<RoutePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
