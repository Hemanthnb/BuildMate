import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Language() {
  const buttonStyle = {
    display: "block",
    width: "200px", // Set a fixed width for all buttons
    marginBottom: "10px",
  };

  const sendOptions = async (event) => {
    let options = null;
    let btnTxt = event.target.innerText;
    console.log(btnTxt)
    switch (btnTxt) {
      case "C++":
      options="1"
      break;
      case "Groovy":
      options="2"
      break;
      case "Java":
      options="3"
      break;
      case "Kotlin":
      options="4"
      break;
      case "Scala":
      options="5"
      break;
      case "Swift":
      options="6"
      break;
      default:
      options=null
    }
      try {
      const response = await axios.post("http://127.0.0.1:3090/options", {
        data: options,
      });
    } catch (error) {
      console.error("Error sending data to Flask:", error);
    }
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
    <h2 style={{marginBottom:"50px"}}>Select Programming Language</h2>

      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
      <Link style={{textDecoration:"none",color: "inherit"}} to={'/buildscript'}>C++</Link>

      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link style={{textDecoration:"none",color: "inherit"}} to={'/buildscript'}>Groovy</Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link style={{textDecoration:"none",color: "inherit"}} to={'/buildscript'}>Java</Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link  style={{textDecoration:"none",color: "inherit"}} to={'/buildscript'}>Kotlin</Link>
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link style={{textDecoration:"none",color: "inherit"}}to={'/buildscript'} >Scala</Link>
      </button>

      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={sendOptions}
      >
        <Link style={{textDecoration:"none",color: "inherit"}} to={'/buildscript'}>Swift</Link>
      </button>
    </div>
  );
}
