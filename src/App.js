import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
    
    <Router>
      <Navbar/>
      <Alert alert={alert} />
      <Routes>
      <Route exact path="/" element={<Home showAlert = {showAlert} />} />
      <Route exact path="/about" element={<About/>} />
      <Route exact path="/Login" element={<Login showAlert = {showAlert} />} />
      <Route exact path="/Signup" element={<Signup showAlert = {showAlert} />} />
          </Routes>
        </Router>
        </NoteState>
</>
  );
}

export default App;
