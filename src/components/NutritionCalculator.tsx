import React, { FC, useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/nutritioncalculator.css";
import {
  AddFoodCal,
  AddFoodCalReqDTO,
  CalculatorTable,
  DelFoodCalReqDTO,
} from "../interface/Calcu";
import moment from "moment";
import { ApiService } from "../constant/ApiService";
import { Spinner } from "react-bootstrap";

interface NutritionCalculatorProps {
  username?: string;
  foodCalItems?: CalculatorTable[];
  onFoodCalAdded: () => void;
}

const NutritionCalculator: FC<NutritionCalculatorProps> = ({
  username,
  foodCalItems = [],
  onFoodCalAdded,
}) => {
  const [selectedFoodName, setSelectedFoodName] = useState<string>("");
  const [quantityInput, setQuantityInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalProteins, setTotalProteins] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);

  useEffect(() => {
    let cal = 0;
    let carb = 0;
    let prot = 0;
    let fat = 0;

    foodCalItems.forEach((item) => {
      cal += item.calories;
      carb += item.carbs;
      prot += item.protein;
      fat += item.fats;
    });

    setTotalCalories(parseFloat(cal.toFixed(0)));
    setTotalCarbs(parseFloat(carb.toFixed(0)));
    setTotalProteins(parseFloat(prot.toFixed(0)));
    setTotalFats(parseFloat(fat.toFixed(0)));
  }, [foodCalItems]);

  const handleAddFood = useCallback(async () => {
    const parsedQuantity = parseFloat(quantityInput);

    if (!username) {
      alert("Username is required to add food.");
      return;
    }
    if (!selectedFoodName) {
      alert("Please select a food type.");
      return;
    }
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert("Please enter a valid quantity (must be a positive number).");
      return;
    }

    const addingCalorie: AddFoodCalReqDTO = {
      username: username,
      food_name: selectedFoodName,
      quantity: parsedQuantity,
    };

    try {
      await ApiService.addCalorie(addingCalorie);
      setSelectedFoodName("");
      setQuantityInput("");
      onFoodCalAdded();
    } catch (err) {
      console.error("Error adding food:", err);
      setError("Failed to add food. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [username, selectedFoodName, quantityInput, onFoodCalAdded]);

  const handleRemoveFood = useCallback(
    async (logIdToRemove: string) => {
      if (!username) {
        alert("Username is required to delete food.");
        return;
      }
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this food item?"
      );
      if (!confirmDelete) return;

      const deleteCalorie: DelFoodCalReqDTO = {
        username: username,
        log_id: logIdToRemove,
      };

      setLoading(true);

      try {
        await ApiService.delCalorie(deleteCalorie);
        onFoodCalAdded();
      } catch (err) {
        console.error("Error deleting food:", err);
        setError("Failed to delete food. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [username, onFoodCalAdded]
  );

  const handleClearAll = useCallback(async () => {
    if (!username) {
      alert("Username is required to clear all food items.");
      return;
    }
    const confirmClear = window.confirm(
      "Are you sure you want to clear all food items?"
    );
    if (!confirmClear) return;

    setError(null);
    try {
      for (const item of foodCalItems) {
        await ApiService.delCalorie({ username, log_id: item.log_id });
      }
      onFoodCalAdded();
    } catch (err) {
      console.error("Error clearing all food items:", err);
      setError("Failed to clear all food items. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [username, foodCalItems, onFoodCalAdded]);

  return (
    <div
      className="container mt-5"
      style={{ backgroundColor: "#fff9e6", minHeight: "100vh" }}
    >
      <h2 className="mb-3">Nutrition Calculator</h2>
      <p className="mb-4">Calculate the nutritional content of your meals</p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h5>Add Food</h5>
            <div className="mb-3">
              <label htmlFor="foodType" className="form-label">
                Food Type
              </label>
              <select
                id="foodType"
                className="form-select"
                value={selectedFoodName}
                onChange={(e) => setSelectedFoodName(e.target.value)}
              >
                <option value="">Select a food</option>
                <option value="apple">Apple</option>
                <option value="chicken">Chicken</option>
                <option value="rice">Rice</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity (grams)
              </label>
              <input
                type="text"
                id="quantity"
                className="form-control"
                placeholder="e.g., 100"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                min="1"
              />
            </div>
            <button className="btn btn-warning w-100" onClick={handleAddFood}>
              Add to Calculation
            </button>
          </div>

          <div className="card p-4 mt-4">
            <h5>Nutrition Facts</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Calories</span>
              <span>{totalCalories} kcal</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Carbohydrates</span>
              <span>{totalCarbs} g</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Proteins</span>
              <span>{totalProteins} g</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Fats</span>
              <span>{totalFats} g</span>
            </div>
            <small className="text-muted">
              * Percent Daily Values are based on a 2,000 calorie diet.
            </small>
          </div>
        </div>

        <div className="col-md-8 mb-4">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Food Items</h5>
              {foodCalItems.length > 0 && ( // Use foodCalItems here
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={handleClearAll}
                  style={{ textDecoration: "none" }}
                >
                  Clear All
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-2">Loading food items...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : foodCalItems.length === 0 ? ( // Use foodCalItems here
              <div className="text-center py-5">
                <img
                  src="https://via.placeholder.com/50?text=🍴"
                  alt="Fork Icon"
                  className="mb-3"
                />
                <h4>No food items added yet</h4>
                <p>
                  Add food items to calculate their nutritional content. Select
                  a food type and enter the quantity to get started.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Food Type</th>
                      <th>Quantity (g)</th>
                      <th>Calories (kcal)</th>
                      <th>Carbs (g)</th>
                      <th>Proteins (g)</th>
                      <th>Fats (g)</th>
                      <th></th> {/* For delete button */}
                    </tr>
                  </thead>
                  <tbody>
                    {foodCalItems.map(
                      (
                        item // Use foodCalItems here
                      ) => (
                        <tr key={item.log_id}>
                          <td>{item.food_name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.calories.toFixed(0)}</td>
                          <td>{item.carbs.toFixed(0)}</td>
                          <td>{item.protein.toFixed(0)}</td>
                          <td>{item.fats.toFixed(0)}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveFood(item.log_id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13V9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H2.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2.5a1 1 0 0 1 1 1zM2 2v1h11V2a.5.5 0 0 0-.5-.5H2.5A.5.5 0 0 0 2 2m2 3h8V4H4z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                    <tr className="table-secondary fw-bold">
                      <td>Totals</td>
                      <td></td>
                      <td>{totalCalories}</td>
                      <td>{totalCarbs}</td>
                      <td>{totalProteins}</td>
                      <td>{totalFats}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="card p-4 mb-4">
          <h5>Nutritional Tips</h5>
          <div className="row">
            <div className="col-md-6 d-flex align-items-start mb-3 mb-md-0">
              <span className="nutrition-icon me-2">⚖️</span>
              <div>
                <strong>Balance Your Macros</strong>
                <p className="text-muted">
                  Aim for a balanced intake of carbohydrates, proteins, and fats
                  for optimal health.
                </p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-start">
              <span className="nutrition-icon me-2">📏</span>
              <div>
                <strong>Portion Control</strong>
                <p className="text-muted">
                  Be mindful of portion sizes to maintain a healthy calorie
                  intake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCalculator;
