
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Driver from './pages/driver/driverpage.jsx'
import User from './pages/user/userpage.jsx'


import './App.css'
import MapComponent from './pages/map/MapComponent.jsx';

export default function App() {
  return (
<Router>
      <Routes>
       
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Driver />} />
        <Route path="/map" element={<MapComponent />} />
        </Routes>
    </Router>
  );
}
