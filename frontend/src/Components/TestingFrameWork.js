import React from "react";
import axios from "axios";
import { Link,Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "./Successful";


export default function TestingFrameWork() {
    const history = useNavigate();
    const buttonStyle = {
        display: "block",
        width: "200px", // Set a fixed width for all buttons
        marginBottom: "10px",
    };
    const sendOptions = async (event) => {
        let options = null;
    let btnTxt = event.target.innerText;
    console.log(btnTxt);
    switch (btnTxt) {
      case "JUnit":
        options = "1";
        break;
      case "TestNG":
        options = "2";
        break;
      case "Spock":
        options = "3";
        break;
      case "Junit Jupiter":
        options = "4";
        break;
      default:
        options = null;
    }
    
    try {
      const response = await axios.post("http://127.0.0.1:3090/options", {
        data: options,
      });
    } catch (error) {
      console.error("Error sending data to Flask:", error);
    }

    try {
        const response = await axios.post("http://127.0.0.1:3090/final", {
        });
      } catch (error) {
        console.error("Error sending data to Flask:", error);
      }

      fetch('http://127.0.0.1:3090/gradle', {
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
                    setTimeout(() => {
                        history("/dependency");
                      }, 4000);
                }
                else{
                    history("/failed"); // Now, data contains the response text
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });





    // try {
    //     // Call Flask API to execute the /gradle method
    //     const response = await axios.post("http://127.0.0.1:3090/gradle");
    //     console.logr(response.data)
    //     if (response.data === "true") {
    //       // If the /gradle method returns true, navigate to the /done route
    //       history.push("/done");
    //     } else {
    //       console.error("Failed to execute /gradle method.");
    //     }
    //   } catch (error) {
    //     console.error("Error sending data to Flask:", error);
    //   }
  }
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
    <h2 style={{marginBottom:"50px"}}>Select Testing FrameWork</h2>

      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link
          to="/build"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          JUnit
        </Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link
          to="/build"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          TestNG
        </Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link
          to="/build"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Spock
        </Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link
          to="/build"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          JUnit Jupiter
        </Link>
      </button>
      <Routes>
      <Route path="/build"element={<LoadingScreen/>}/>
      </Routes>
    </div>
  );
}
