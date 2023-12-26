import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dependency() {
  const buttonStyle = {
    display: "block",
    width: "200px", // Set a fixed width for all buttons
    marginBottom: "10px",
  };

  const history = useNavigate();
  const addDepenndency = async () => {
    try {
      console.log("Entered");
      await axios.post('http://127.0.0.1:3090/adddependency');
    } catch (error) {
      console.error('Error resetting commands:', error);
    };
    setTimeout(() => {
      history("/dependencyadded");
    }, 4000);
  }
//     let options = null;
//     let btnTxt = event.target.innerText;
//     console.log(btnTxt);
//     switch (btnTxt) {
//       case "Kotlin":
//         options = "1";
//         break;
//       case "Groovy":
//         options = "2";
//         break;
//       default:
//         options = null;
//     }
//     try {
//       const response = await axios.post("http://127.0.0.1:3090/options", {
//         data: options,
//       });
//     } catch (error) {
//       console.error("Error sending data to Flask:", error);
//     }
//   };

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
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        style={buttonStyle}
        onClick={addDepenndency}
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/build"}
        >
          Add Dependency
        </Link>
      </button>
    </div>
  );
}
