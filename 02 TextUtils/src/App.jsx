import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './components/Navbar.jsx';
import TextUtils from './components/TextUtils.jsx';
import Alert from './components/Alert.jsx';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import About from './components/About.jsx';


function App() {
  const [mode, setMode] = useState("dark");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
  }
  const handleMode = () => {
    if (mode === 'dark'){
      setMode("light")
      showAlert("Light mode enabled!", "success")
      setTimeout(() => {
        showAlert(null)
      }, 1500)
    }else{
      setMode("dark")
      showAlert("Dark mode enabled!", "success")
      setTimeout(() => {
        showAlert(null)
      }, 1500)
    }
  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils" alert={alert} handleMode={handleMode} mode={mode} />
        <div className="container">
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<TextUtils showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
          
        </div>
      </Router>
    </>
  )
}

export default App
