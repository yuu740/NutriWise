import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/nutritioncalculator.css';

const NutritionCalculator: React.FC = () => {
  const [selectedFood, setSelectedFood] = useState<string>('');

  return (
    <div className="container mt-5" style={{ backgroundColor: '#fff9e6', minHeight: '100vh' }}>
      <h2 className="mb-3">Nutrition Calculator</h2>
      <p className="mb-4">Calculate the nutritional content of your meals</p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h5>Add Food</h5>
            <div className="mb-3">
              <label htmlFor="foodType" className="form-label">Food Type</label>
              <select
                id="foodType"
                className="form-select"
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
              >
                <option value="">Select a food</option>
                <option value="apple">Apple</option>
                <option value="chicken">Chicken</option>
                <option value="rice">Rice</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity (grams)</label>
              <input
                type="text"
                id="quantity"
                className="form-control"
                placeholder="e.g., 100"
              />
            </div>
            <button className="btn btn-warning w-100">Add to Calculation</button>
          </div>

          <div className="card p-4 mt-4">
            <h5>Nutrition Facts</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Calories</span>
              <span>0 kcal</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Carbohydrates</span>
              <span>0 g</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Proteins</span>
              <span>0 g</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Fats</span>
              <span>0 g</span>
            </div>
            <small className="text-muted">* Percent Daily Values are based on a 2,000 calorie diet.</small>
          </div>
        </div>

        <div className="col-md-8 mb-4">
          <div className="card p-4 text-center">
            <img src="https://via.placeholder.com/50?text=🍴" alt="Fork Icon" className="mb-3" />
            <h4>No food items added yet</h4>
            <p>Add food items to calculate their nutritional content. Select a food type and enter the quantity to get started.</p>
          </div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h5>Nutritional Tips</h5>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-start">
            <img src="https://via.placeholder.com/20?text=⚖️" alt="Balance Icon" className="me-2" />
            <div>
              <strong>Balance Your Macros</strong>
              <p>Aim for a balanced intake of carbohydrates, proteins, and fats for optimal health.</p>
            </div>
          </div>
          <div className="d-flex align-items-start">
            <img src="https://via.placeholder.com/20?text=📏" alt="Portion Icon" className="me-2" />
            <div>
              <strong>Portion Control</strong>
              <p>Be mindful of portion sizes to maintain a healthy calorie intake.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCalculator;