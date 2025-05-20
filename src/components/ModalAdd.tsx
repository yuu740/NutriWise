import React, { FC } from "react";
import { Form } from "react-router-dom";
import "../styles/modaladd.css";
import { AddFood, AddFoodReqDTO } from "../interface/Foodlist";
import moment from "moment";

interface ModalAddProps {
  onClose: () => void;
  onSubmit: (newFood: AddFood) => void;
  addedFoodList?: AddFood;
}

export const ModalAdd: FC<ModalAddProps> = ({
  onClose,
  onSubmit,
  addedFoodList,
}) => {
  const [formState, setFormState] = React.useState<AddFood>({
    food_name: "",
    quantity: 1,
    expiry_date: moment(),
  });
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>Food Type</label>
        <input
          type="text"
          className="modal-input"
          value={formState.food_name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, food_name: e.target.value }))
          }
        />

        <label>Quantity</label>
        <input
          type="number"
          className="modal-input"
          value={formState.quantity}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              quantity: Number(e.target.value),
            }))
          }
        />

        <label>Expiry Date</label>
        <input
          type="date"
          className="modal-input"
          value={formState.expiry_date ? moment(formState.expiry_date).format("YYYY-MM-DD") : ""}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              expiry_date: moment(e.target.value, "YYYY-MM-DD"),
            }))
          }
        />
        <div className="modal-actions">
          <button
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="modal-add-btn"
            onClick={() => {
              onSubmit(formState);
              onClose(); 
            }}
            disabled={
              !formState.food_name || !formState.expiry_date || (formState.quantity ?? 0) <= 0
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
