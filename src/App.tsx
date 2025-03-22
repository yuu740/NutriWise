import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import NutriWiseBanner from "./component/FoodListNotif";

function App() {
  return (
    <div className="App">
      <Navbar />
      <NutriWiseBanner
        username="Hutao"
        foodItems={[
          // { name: "Milk", expiryDate: new Date("2025-03-23") },
          { name: "Eggs", expiryDate: new Date("2023-08-20") }
        ]}
        onAddFood={() => console.log("Add food")}
        onExpiryPress={() => console.log("View details")}
      />
    </div>
  );
}

export default App;
