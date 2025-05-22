import React, { FC, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { AddFood, FoodReqDTO } from "../interface/Foodlist";
import moment, { Moment } from "moment";

interface ModalAddProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (newFood: AddFood) => void;
  addedFoodList?: AddFood;
}

export const ModalAdd: FC<ModalAddProps> = ({
  show,
  onClose,
  onSubmit,
  addedFoodList,
}) => {
  const [formState, setFormState] = React.useState<AddFood>({
    food_name: addedFoodList?.food_name ?? "",
    quantity: addedFoodList?.quantity ?? 1,
    expiry_date: addedFoodList?.expiry_date ?? moment(),
  });

  const [errors, setErrors] = useState({
    food_name: false,
    quantity: false,
    expiry_date: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      food_name: !formState.food_name,
      quantity: !formState.quantity || formState.quantity <= 0,
      expiry_date: !formState.expiry_date || !moment.isMoment(formState.expiry_date),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    onSubmit(formState);
    onClose();
  };

  return (
   <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Food Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4">
          Enter the details of the food item you want to add to your list.
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="food-type">Food Type</Form.Label>
            <Form.Control
              id="food-type"
              type="text"
              value={formState.food_name}
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, food_name: e.target.value }));
                if (e.target.value) setErrors((prev) => ({ ...prev, food_name: false }));
              }}
              placeholder="e.g., Bread, Milk, Eggs"
              isInvalid={errors.food_name}
              className="modal-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a food type
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="quantity">Quantity</Form.Label>
            <Form.Control
              id="quantity"
              type="number"
              value={formState.quantity}
              onChange={(e) => {
                setFormState((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }));
                if (e.target.value && Number(e.target.value) > 0)
                  setErrors((prev) => ({ ...prev, quantity: false }));
              }}
              placeholder="e.g., 1, 2, 3"
              min="1"
              isInvalid={errors.quantity}
              className="modal-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid quantity
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="expiry-date">Expiry Date</Form.Label>
            <Form.Control
              id="expiry-date"
              type="date"
              value={
                formState.expiry_date
                  ? moment(formState.expiry_date).format("YYYY-MM-DD")
                  : ""
              }
              onChange={(e) => {
                setFormState((prev) => ({
                  ...prev,
                  expiry_date: moment(e.target.value, "YYYY-MM-DD"),
                }));
                if (e.target.value)
                  setErrors((prev) => ({ ...prev, expiry_date: false }));
              }}
              isInvalid={errors.expiry_date}
              className="modal-input"
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid expiry date
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onClose}
          className="modal-cancel-btn"
        >
          Cancel
        </Button>
        <Button
          variant="warning"
          onClick={handleSubmit}
          disabled={
            !formState.food_name ||
            !formState.expiry_date ||
            (formState.quantity ?? 0) <= 0
          }
          className="modal-add-btn bg-amber-600 hover:bg-amber-700"
        >
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
