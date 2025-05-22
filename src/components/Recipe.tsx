import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/recipe.css';

const RecipesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('canMakeNow');

  return (
    <div className="container mt-5" style={{ backgroundColor: '#fff9e6', minHeight: '100vh' }}>
      <div className="row input-group mb-3">
        <h2 className="col-mb-3 align-items-start">Recipe Collection</h2>
        <p className="col align-items-start">Find recipes based on ingredients you have</p>
        <input type="text" className="col mb-4 align-items-end form-control" placeholder="Search recipes..." />
      </div>
      <div className="nav nav-tabs mb-3 row">
          <button
            className={`nav-link col ${activeTab === 'all' ? 'active' : 'notActive'}`}
            onClick={() => setActiveTab('all')}
          >
            All Recipes
          </button>
          <button
            className={`nav-link col ${activeTab === 'canMakeNow' ? 'active' : 'notActive'}`}
            onClick={() => setActiveTab('canMakeNow')}
          >
            Can Make Now
          </button>
          <button
            className={`nav-link col ${activeTab === 'partiallyAvailable' ? 'active' : 'notActive'}`}
            onClick={() => setActiveTab('partiallyAvailable')}
          >
            Partially Available
          </button>
      </div>

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