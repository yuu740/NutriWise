import React, { FC, useState } from "react";
import "../styles/foodlist.css";
import moment from "moment";
import { Foodlist } from "../interface/Foodlist";
import { ModalAdd } from "./ModalAdd";

interface FoodListProps {
  username: string;
  foodItems: Foodlist[] | undefined;
}

export const FoodList: FC<FoodListProps> = ({ foodItems }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dateFormat = moment().format("MMMM Do YYYY");
  const openModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const addFoodHandler = () => {
    
  }
  const renderContent = () => {
    if (!foodItems || foodItems.length === 0) {
      return (
        <div className="empty-box">
          <p className="empty-text">
            You haven’t any food list, Please click <strong>Add</strong> button
          </p>
        </div>
      );
    } else {
      return <div>ADA</div>;
    }
  };
  return (
    <div className="food-list-container">
      <h1 className="title">Food List</h1>
      <p className="date">Now : {dateFormat}</p>
      {renderContent()}

      <div className="buttons">
        <button className="btn btn-add" onClick={openModal}>
          Add
        </button>
        <button className="btn btn-delete">Delete</button>
      </div>
      {isOpenModal ? <ModalAdd onClose={openModal} onSubmit={addFoodHandler} /> : ""}
    </div>
  );
};
