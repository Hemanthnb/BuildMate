import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AutomationsPage(props) {
    const buttonStyle = {
        display: 'block',
        width: '200px', // Set a fixed width for all buttons
        marginBottom: '10px',
      };

      const handleClick = async (event) => {
        const buttonText = event.target.innerText;
        console.log(buttonText)
        try {
          const response = await axios.post("http://127.0.0.1:3090/setauto", {
            data: buttonText
          });
        } catch (error) {
          console.error("Error sending data to Flask:", error);
        }
      };
        // console.log(event.target.innerText)
    
      return (
        <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2 style={{marginBottom:"50px"}}>Select Automation Name</h2>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={handleClick} // Attach onClick event handler
      >
     <Link to="/buildtool"  style={{textDecoration:"none",color: "inherit"}}>Web Automation</Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={handleClick} // Attach onClick event handler
      >
        <Link to="/buildtool" style={{textDecoration:"none",color: "inherit"}}>Mobile Automation</Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={handleClick} // Attach onClick event handler
      >
    <Link to="/buildtool" style={{textDecoration:"none",color: "inherit"}}>API Automation</Link>

      </button>
    </div>
      );
}
