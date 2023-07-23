import "./App.css";
import Login from "./Components/Authencation/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import Signup from "./Components/Authencation/Signup";
import PrivateRoutes from "./PrivateRoutes";
import MainRoutes from "./MainRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainRoutes />}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<DashBoard />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
