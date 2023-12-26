import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function BuildTool() {
    const history = useNavigate();
  const buttonStyle = {
    display: "block",
    width: "200px", // Set a fixed width for all buttons
    marginBottom: "10px",
  };

  const sendOptions = async (event) => {

    fetch('http://127.0.0.1:3090/maven', {
                method: 'POST'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Note the parentheses to call the function
            })
            .then(data => {
                if(data==="true"){
                    history("/done");
                }
                else{
                    history("/failed"); // Now, data contains the response text
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
            // setTimeout(() => {
            //   history("/mavendependency");
            // }, 10000);




  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2 style={{marginBottom:"50px"}}>Select Build Management Tool</h2>

      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/language"}
        >
          Gradle
        </Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/build"}
        >
          Maven
        </Link>
      </button>
    </div>
  );
}
