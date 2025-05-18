import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Calculator } from "./components/Calculator";
import { FoodList } from "./components/FoodList";
import { Recipe } from "./components/Recipe";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import NutriWiseBanner from "./components/NutriWiseBanner";
import GoToCalculator from "./components/GoToCalculator";
import getUserData from "./utils/getUserData";
import { Foodlist } from "./interface/Foodlist";
import { ApiService } from "./constant/ApiService";
import { UserData } from "./interface/User";
import { toast } from "react-toastify";

const AppContent = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [dataFoodList, setDataFoodList] = useState<Foodlist[]>();
  const navigate = useNavigate();

  const location = useLocation();
  const showBanner = !['/calculator', '/food-list', '/recipe'].includes(location.pathname);


  
  useEffect(() =>{
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

  const getFoodListData = async  () => {
    if (!userData?.name) return;
    try {
          const res = await ApiService.getFoodlistBasedUser(userData?.name);
          setDataFoodList(res);


    }catch (error:any){
      toast.error(error.message);
    }

  }

  return (
    <>
      <Navbar />
      {showBanner && (
        <NutriWiseBanner
          // username="Hutao"
          username={`${userData?.name ? userData?.name : "Guest"}`}

          foodItems={dataFoodList}
          onAddFood={() => navigate('/food-list')}
          onExpiryPress={() => console.log("View details")}
        />
      )}
      {showBanner && (
        <GoToCalculator />
      )}
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/food-list" element={<FoodList username={`${userData?.name ? userData?.name : "Guest"}`} foodItems={dataFoodList}/>} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </>
  );
};

const App  = () => {
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
