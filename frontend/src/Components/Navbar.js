import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const handleClick = async () => {
    try {
      await axios.post('http://127.0.0.1:3090/reset');
      console.log('Commands reset successfully');
    } catch (error) {
      console.error('Error resetting commands:', error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Script Automator</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" onClick={handleClick}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
