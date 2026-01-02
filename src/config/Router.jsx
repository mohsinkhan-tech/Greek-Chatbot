import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";

export default function AuraRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
