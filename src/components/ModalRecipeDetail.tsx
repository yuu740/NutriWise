import React, { FC } from "react";
import { Modal, Button } from "react-bootstrap";

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
    const formatInstructions = (steps: string[]): string[] => {

    const combinedSteps = steps.join(' '); 
    return combinedSteps
      .split(/(?<=[.?!])\s+(?=[A-Z0-9])/)
      .map(step => step.trim()) 
      .filter(step => step.length > 0);
  };
   const formattedRecipeSteps = formatInstructions(recipeSteps);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Ingredients Needed:</h5>
        <ul className="list-unstyled mb-3"> 
          {ingredients.map((item, index) => (
            <li
              key={index}
              className={`d-flex align-items-center mb-2`} 
            >
              <span
                className={`missing-indicator rounded-circle me-2`}
                style={{
                  width: '10px',
                  height: '10px',
                  display: 'inline-block',
                  backgroundColor: item.has ? '#28a745' : '#dc3545', 
                }}
              ></span>
              {item.name} 
            </li>
          ))}
        </ul>

        {ingredientDetails && ingredientDetails.length > 0 && (
          <>
            <h5>Detailed Ingredients:</h5>
            <ul className="list-unstyled mb-3"> 
              {ingredientDetails.map((detail, index) => (
                <li key={index}>• {detail}</li> 
              ))}
            </ul>
          </>
        )}

       <h5>Instructions:</h5>
        <ol className="list-group list-group-numbered">
          {formattedRecipeSteps.length > 0 ? (
            formattedRecipeSteps.map((step, index) => (
              <li key={index} className="list-group-item">
                {step}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No instructions available.</li>
          )}
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
