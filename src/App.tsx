import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FoodList } from "./components/FoodList";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import NutriWiseBanner from "./components/Home";
import RecipesPage from "./components/Recipe";
import NutritionCalculator from "./components/NutritionCalculator";

import getUserData from "./utils/getUserData";
import { FoodlistResDTO } from "./interface/Foodlist";
import { ApiService } from "./constant/ApiService";
import { UserData } from "./interface/User";
import { toast } from "react-toastify";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";

const App = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [dataFoodList, setDataFoodList] = useState<FoodlistResDTO[]>();

  useEffect(() => {
    const user = getUserData() as UserData;
    if (user) {
      setUserData(user);
    }
  }, []);
  useEffect(() => {
    if (userData?.name) {
      getFoodListData();
    }
  }, [userData]);

  const getFoodListData = async () => {
    if (!userData?.name) return;
    try {
      const res = await ApiService.getFoodlistBasedUser(userData?.name);
      setDataFoodList(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home isLoggedIn={userData != null} />} />
          <Route path="calculator" element={<NutritionCalculator />} />
          <Route path="food-list" element={<FoodList />} />
          <Route path="recipes" element={<RecipesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
