import React, { FC } from "react";
import { Form } from "react-router-dom";
import "../styles/modaladd.css";

interface ModalAddProps {
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalAdd: FC<ModalAddProps> = ({ onClose, onSubmit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>Food Type</label>
        <input type="text" className="modal-input" />

        <label>Quantity</label>
        <input type="number" className="modal-input" />

        <label>Expiry Date</label>
        <input type="date" className="modal-input" />
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onClose}>
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
