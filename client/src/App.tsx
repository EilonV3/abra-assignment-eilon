// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { CreationPage } from "./components/creation-page/CreationPage.tsx";
import { WelcomePage } from "./components/welcome-page/WelcomePage.tsx";
import { PlacesPage } from "./components/places-page/PlacesPage.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/add-place" element={<CreationPage />} />
          <Route path="/places" element={<PlacesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
