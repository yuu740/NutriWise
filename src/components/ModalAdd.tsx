import React, { FC } from "react";
import { Form } from "react-router-dom";
import "../styles/modaladd.css";
import { AddFood } from "../interface/Foodlist";

interface ModalAddProps {
  onClose: () => void;
  onSubmit: () => void;
  addedFoodList?: AddFood;
}

export const ModalAdd: FC<ModalAddProps> = ({ onClose, onSubmit, addedFoodList}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>Food Type</label>
        <input type="text" className="modal-input" value={addedFoodList?.food_name || ""}/>

        <label>Quantity</label>
        <input type="number" className="modal-input" value={addedFoodList?.quantity ||  0} />

        <label>Expiry Date</label>
        <input type="date" className="modal-input" />
        <div className="modal-actions">
          <button className="modal-cancel-btn" value={addedFoodList?.expiry_date ? String(addedFoodList.expiry_date) : undefined} onClick={onClose}>
            Cancel
          </button>
          <button className="modal-add-btn" onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
