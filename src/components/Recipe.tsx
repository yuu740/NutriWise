import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/recipe.css';

const RecipesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('canMakeNow');

  return (
    <div className="container mt-5" style={{ backgroundColor: '#fff9e6', minHeight: '100vh' }}>
      <h2 className="mb-3">Recipe Collection</h2>
      <p className="mb-4">Find recipes based on ingredients you have</p>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search recipes..." />
      </div>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Recipes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'canMakeNow' ? 'active' : ''}`}
            onClick={() => setActiveTab('canMakeNow')}
          >
            Can Make Now
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'partiallyAvailable' ? 'active' : ''}`}
            onClick={() => setActiveTab('partiallyAvailable')}
          >
            Partially Available
          </button>
        </li>
      </ul>

      <div className="card p-4 text-center">
        {activeTab === 'partiallyAvailable' && (
          <>
            <img src="https://via.placeholder.com/50?text=🍳" alt="Chef Icon" className="mb-3" />
            <h4>No partially available recipes</h4>
            <p>You either have all ingredients for recipes or none at all.</p>
          </>
        )}
        {activeTab === 'canMakeNow' && (
          <>
            <img src="https://via.placeholder.com/50?text=🍳" alt="Chef Icon" className="mb-3" />
            <h4>No recipes available to make</h4>
            <p>Add more ingredients to your food list to see recipes you can make with what you have.</p>
          </>
        )}
        {activeTab === 'all' && (
          <>
            <img src="https://via.placeholder.com/50?text=🍳" alt="Chef Icon" className="mb-3" />
            <h4>Placeholder for getting recipe logic</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;