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
import { CalculatorTable } from "./interface/Calcu";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>({});
  const [dataFoodList, setDataFoodList] = useState<FoodlistResDTO[]>();
  const [dataFoodCalList, setDataFoodCalList] = useState<CalculatorTable[]>();
  const [foodListName, setfoodListName] = useState<string[]>([]);
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
      getFoodCalData();
    } else {
      setDataFoodList([]);
      setDataFoodCalList([]);
      console.log("App: User data name not available, clearing food data.");
    }
  }, [userData]);

   useEffect(() => {
    getAllFoodNames();
  }, []);

  const getFoodListData = async () => {
    if (!userData?.name) {
      console.warn("getFoodListData: Username is not available.");
      return; 
    }
    try {
      const res = await ApiService.getFoodlistBasedUser(userData?.name);
      setDataFoodList(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getFoodCalData = async () => {
    if (!userData?.name) {
      console.warn("getFoodNameData: Username is not available.");
      return; 
    }
    try {
      const data: CalculatorTable[] = await ApiService.getCalorieBasedUser(userData.name);
      if (Array.isArray(data)) {
        setDataFoodCalList(data);
      } else {
        setDataFoodCalList([]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getAllFoodNames = async () => {
    try {
      const response = await ApiService.getFoodListName(); 
      if (response && response.ok) {
        const foodNames = await response.json(); 
        setfoodListName(foodNames);
      } else {
        toast.error("Failed to fetch food names.");
      }
    } catch (error: any) {
      toast.error("Error fetching food names: " + error.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<TermsOfService />} /> 
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home isLoggedIn={userData != null} />} />
          <Route
            path="calculator"
            element={
              <NutritionCalculator
                username={userData?.name}
                foodCalItems={dataFoodCalList}
                onFoodCalAdded={getFoodCalData}
                foodNames={foodListName}
              />
            }
          />
          <Route
            path="food-list"
            element={
              <FoodList
                username={userData?.name}
                foodItems={dataFoodList}
                onFoodAdded={getFoodListData}
              />
            }
          />
          <Route
            path="recipes"
            element={<RecipesPage username={userData?.name} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
