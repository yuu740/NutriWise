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
import Cookies from "js-cookie";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>({});
  const [dataFoodList, setDataFoodList] = useState<FoodlistResDTO[]>();

  useEffect(() => {
    const user = getUserData() as UserData;
    if (user) {
      setUserData(user);
      setIsLoggedIn(true);
    } else {
      Cookies.remove("token");
      setUserData(null);
      setIsLoggedIn(false);
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
          <Route path="food-list" element={<FoodList username = {userData?.name} foodItems={dataFoodList} onFoodAdded = {getFoodListData}/>} />
          <Route path="recipes" element={<RecipesPage username = {userData?.name}/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
