import React, { FC, useCallback, useEffect, useState } from "react";
import "../styles/foodlist.css";
import moment from "moment";
import { AddFood, AddFoodReqDTO, FoodlistResDTO, FoodListTable } from "../interface/Foodlist";
import { ModalAdd } from "./ModalAdd";
import { ApiService } from "../constant/ApiService";
import { getExpiryStatus } from "../utils/getExpStatus";

interface FoodListProps {
  username?: string;
  foodItems?: FoodlistResDTO[];
}

export const FoodList: FC<FoodListProps> = ({ username, foodItems = [] }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
   const [foodListState, setFoodListState] = useState<FoodListTable[]>([]);



  const dateFormat = moment().format("MMMM Do YYYY");
  
  useEffect(() => {
    const converted = foodItems.map((item) => ({
      food_name: item.food_name,
      quantity: item.quantity,
      expiry_date: new Date(item.expiry_date),
      status: getExpiryStatus(item.expiry_date),
    }));
    setFoodListState(converted);
  }, [foodItems]);
  
  
  const handleModal = useCallback(() => {
  setIsOpenModal((prev) => !prev);
}, []);

  const addFoodHandler = useCallback(async (newFood: AddFood) => {
    if (!newFood.food_name || !newFood.quantity || !newFood.expiry_date) return;

     const newFoodItem: AddFoodReqDTO= {
      username: username ?? "Guest",
      food_name: newFood.food_name,
      quantity: newFood.quantity,
      expiry_date: moment(newFood.expiry_date).format("YYYY-MM-DD"),
    };

    try {
    await ApiService.addFoodList(newFoodItem);
    const addedItem: FoodListTable = {
        food_name: newFood.food_name,
        quantity: newFood.quantity,
        expiry_date: newFood.expiry_date instanceof Date
          ? newFood.expiry_date
          : (moment.isMoment(newFood.expiry_date)
              ? newFood.expiry_date.toDate()
              : new Date(newFood.expiry_date)),
        status: getExpiryStatus(
          newFood.expiry_date instanceof Date
            ? newFood.expiry_date
            : (moment.isMoment(newFood.expiry_date)
                ? newFood.expiry_date.toDate()
                : new Date(newFood.expiry_date))
        ),
      };
      setFoodListState((prevList = []) => [...prevList, addedItem]);
    } catch (error) {
      console.error("Failed to save to backend:", error);
    }
  },  [username])
  const renderContent = () => {
    if (!foodListState || foodListState.length === 0) {
    return (
      <div className="empty-box">
        <p className="empty-text">
          You haven’t any food list, Please click <strong>Add</strong> button
        </p>
      </div>
    );
  } else {
    return (
      <div className="food-list">
        {foodListState.map((item, index) => (
          <div key={index} className="food-item">
            <p><strong>{item.food_name}</strong></p>
            <p>Quantity: {item.quantity}</p>
            <p>Expiry: {moment(item.expiry_date).format("MMMM Do YYYY")}</p>
          </div>
        ))}
      </div>
    );
  }
  };
  return (
    <div className="food-list-container">
      <h1 className="title">Food List</h1>
      <p className="date">Now : {dateFormat}</p>
      {renderContent()}

      <div className="buttons">
        <button className="btn btn-add" onClick={handleModal}>
          Add
        </button>
        <button className="btn btn-delete">Delete</button>
      </div>
      {isOpenModal ? <ModalAdd onClose={handleModal} onSubmit={addFoodHandler} /> : ""}
    </div>
  );
};
