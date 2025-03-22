import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Calculator } from "./component/Calculator";
import { FoodList } from "./component/FoodList";
import { Recipe } from "./component/Recipe";
import { Login } from "./component/Login";
import { Register } from "./component/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/food-list" element={<FoodList />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
