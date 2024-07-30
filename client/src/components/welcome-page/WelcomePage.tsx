import React from "react";
import { Link } from "react-router-dom";

export const WelcomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Abra Assignment</h1>
      <div>
        <Link to="/add-place" className="welcome-button">
          Add a new place
        </Link>
        <Link to="/places" className="welcome-button">
          Show places
        </Link>
      </div>
    </div>
  );
};
