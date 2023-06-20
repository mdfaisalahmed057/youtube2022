import React from "react";
import "../src/style.scss"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "../src/pages/Home"
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)
  return (
    <Routes>
      <Route path="/">
       {!currentUser?(<Route path="/login" element={<Login />}></Route>):<Route index element={<Home />}></Route> }
        
   <Route path="/register" element={<Register />}></Route>
     </Route>
    </Routes>


  );
}

export default App;
