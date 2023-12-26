import './App.css';
import Alerts from './Components/Alerts';
import AutomationsPage from './Components/AutomationsPage';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Language from './Components/Language';
import BuildScript from './Components/BuildScript';
import TestingFrameWork from './Components/TestingFrameWork';
import Successful from './Components/Successful';
import Loading from './Components/Loading';
import Navbar from './Components/Navbar';
import Failed from './Components/Failed';
import BuildTool from './Components/BuildTool';
import Dependency from './Components/Dependency';
import AddedDependency from './Components/AddedDependency';
import AddMavenDepndency from './Components/AddMAvenDependency';


function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (operationResult) => {
    if (operationResult === "gradleTrue") {
      setAlert({
        message: "Gradle project was built successfully",
        type: "success"
      })
    }
    else if(operationResult==="gradleFalse"){
      setAlert({
        message: "Gradle project already exist",
        type: "danger"
      })
    }
  }
  return (<>
  <BrowserRouter>
    <Alerts alert={alert}/>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<AutomationsPage showAlert={showAlert}/>}/>
    <Route exact path="/buildtool" element={<BuildTool/>}/>
    <Route exact path="/language" element={<Language/>}/>
    <Route exact path="/buildscript" element={<BuildScript/>}/>
    <Route exact path="/framework" element={<TestingFrameWork/>}/>
    <Route exact path="/build" element={<Loading/>}/>
    <Route exact path="/done" element={<Successful/>}/>
    <Route exact path="/failed" element={<Failed/>}/>
    <Route exact path="/dependency" element={<Dependency/>}/>
    <Route exact path="/dependencyadded" element={<AddedDependency/>}/>
    <Route exact path="/mavendependency" element={<AddMavenDepndency/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
