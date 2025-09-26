import React from "react";
import SignUp from "./compo/signup/signup";
import { Routes, Route, } from "react-router-dom";
import Login from "./compo/login/login";
import Navbarr from "./compo/nav/nav";
import BuyerDashboard from "./compo/dashboard/buyer";
import SellerDashboard from "./compo/dashboard/seller";
function App() {
  return (
    <div>
      <Navbarr/>
      
      <Routes>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/signup" element={<SignUp/>}/>
        <Route>
        <Route path="/buyerDashboard" element={<BuyerDashboard/>}/>
        <Route path="/sellerDashboard" element={<SellerDashboard/>}/>
        </Route>
      </Routes>
      

    </div>
  );
}
export default App;