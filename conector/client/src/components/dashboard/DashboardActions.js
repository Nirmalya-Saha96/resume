import React from 'react';
import { Link } from 'react-router-dom';


const DashboardActions = () => {
  return (
    <div>
    <div className="dash-buttons">
      <Link to="/edit-profile" class="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
      <Link to="/add-projects" className="btn btn-light">
        <i className="fab fa-pinterest-square text-primary"></i> Add Projects
      </Link>
      <Link to="/add-lisense" className="btn btn-light">
        <i className="fab fa-pinterest-square text-primary"></i> Add Lisense
      </Link>
      <Link to="/add-links" className="btn btn-light">
        <i className="fas fa-globe  text-primary"></i> Add Links
      </Link>
      <Link to="/add-award" className="btn btn-light">
        <i className="fas fa-globe  text-primary"></i> Add Award
      </Link>
    </div>
    </div>
  );
}

export default DashboardActions;
