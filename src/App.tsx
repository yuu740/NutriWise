import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Calculator } from "./components/Calculator";
import { FoodList } from "./components/FoodList";
import { Recipe } from "./components/Recipe";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import NutriWiseBanner from "./components/FoodListNotif";
import GoToCalculator from "./components/GoToCalculator";

const AppContent: React.FC = () => {
  const location = useLocation();
  const showBanner = !['/calculator', '/food-list', '/recipe'].includes(location.pathname);
  return (
    <>
      <Navbar />
      {showBanner && (
        <NutriWiseBanner
          username="Hutao"
          foodItems={[
            { name: "Eggs", expiryDate: new Date("2023-08-20") },
            // { name: "Milk", expiryDate: new Date("2025-03-23") },
          ]}
          onAddFood={() => console.log("Add food")}
          onExpiryPress={() => console.log("View details")}
        />
      )}
      {showBanner && (
        <GoToCalculator />
      )}
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/food-list" element={<FoodList />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
