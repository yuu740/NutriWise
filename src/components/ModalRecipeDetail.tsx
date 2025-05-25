import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IngredientDetail {
  name: string;
  has: boolean;
}

interface ModalRecipeDetailProps {
  show: boolean;
  onClose: () => void;
  recipeTitle: string;
  ingredients: IngredientDetail[]; 
  ingredientDetails: string[]; 
  recipeSteps: string[];
}

export const ModalRecipeDetail: FC<ModalRecipeDetailProps> = ({
  show,
  onClose,
  recipeTitle,
  ingredients,
  ingredientDetails,
  recipeSteps,
}) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Ingredients Needed:</h5>
        <ul className="list-group mb-3">
          {ingredients.map((item, index) => (
            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${item.has ? 'list-group-item-success' : 'list-group-item-secondary'}`}>
              {item.name}
              <span className={`badge ${item.has ? 'bg-success' : 'bg-danger'} text-white`}>
                {item.has ? 'Available' : 'Missing'}
              </span>
            </li>
          ))}
        </ul>

        <h5>Detailed Ingredients:</h5>
        <ul className="list-unstyled mb-3">
          {ingredientDetails.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>

        <h5>Instructions:</h5>
        <ol className="list-group list-group-numbered">
          {recipeSteps.map((step, index) => (
            <li key={index} className="list-group-item">{step}</li>
          ))}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};