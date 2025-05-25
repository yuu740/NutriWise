import React, { FC, useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/recipe.css";
import { ApiService } from "../constant/ApiService";
import { Recipe, RecipeResDTO } from "../interface/Recipe";
import { Button, Card, Spinner } from "react-bootstrap";
import getPercentageBadgeClasses from "../utils/getPercentage";

interface RecipesPageProps {
  username?: string;
}

const RecipesPage: FC<RecipesPageProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState("canMakeNow");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const processRecipes = useCallback((recipe: RecipeResDTO[]): Recipe[] => {
    return recipe.map((recipe, index) => {
      const availableCount = recipe.available_ingredients.length;
      console.log ("This is available count : ", availableCount);
      const totalCount = recipe.total_ingredients;
      const availabilityPercentage =
        totalCount > 0 ? (availableCount / totalCount) * 100 : 0;
      const canMakeNow = availabilityPercentage === 100;
      const missingAllIngredients = availableCount === 0 && totalCount > 0;

      const allIngredientsForDisplay = [
        ...recipe.available_ingredients.map((name) => ({ name, has: true })),
        ...recipe.unavailable_ingredients.map((name) => ({
          name,
          has: false,
        })),
      ].sort(
        (a, b) =>
          (b.has as any) - (a.has as any) || a.name.localeCompare(b.name)
      );

      return {
        recipe_id: recipe.recipe_title.replace(/\s/g, "-") + "-" + index,
        recipe_name: recipe.recipe_title,
        ingredients: allIngredientsForDisplay,
        availability_percentage: parseFloat(availabilityPercentage.toFixed(0)),
        missing_all_ingredients: missingAllIngredients,
        can_make_now: canMakeNow,
      };
    });
  }, []);

  const fetchRecipes = useCallback(async () => {
    console.log("Fetching recipes for username:", username);
    if (!username) {
      console.log("Skipping fetch: username is undefined");
      setError("No username provided. Please log in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getRecipeBasedUser(username);
      const processed = processRecipes(response.recipes);
      console.log("This is processed:", processed);
      setRecipes(processed);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [username, processRecipes]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.recipe_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (activeTab === "all") {
      return matchesSearch;
    } else if (activeTab === "canMakeNow") {
      return recipe.can_make_now && matchesSearch;
    } else if (activeTab === "partiallyAvailable") {
      return (
        !recipe.can_make_now && !recipe.missing_all_ingredients && matchesSearch
      );
    }
    return false;
  });

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#fff9e6",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="row input-group mb-3">
        <h2 className="col-mb-3 align-items-start">Recipe Collection</h2>
        <p className="col align-items-start">
          Find recipes based on ingredients you have
        </p>
        <input
          type="text"
          className="form-control"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="nav nav-tabs mb-3 row">
        <button
          className={`nav-link col ${
            activeTab === "all" ? "active" : "notActive"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Recipes
        </button>
        <button
          className={`nav-link col ${
            activeTab === "canMakeNow" ? "active" : "notActive"
          }`}
          onClick={() => setActiveTab("canMakeNow")}
        >
          Can Make Now
        </button>
        <button
          className={`nav-link col ${
            activeTab === "partiallyAvailable" ? "active" : "notActive"
          }`}
          onClick={() => setActiveTab("partiallyAvailable")}
        >
          Partially Available
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="warning" />
          <p className="ms-3">Loading recipes...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : filteredRecipes.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredRecipes.map((recipe) => (
            <div className="col" key={recipe.recipe_id}>
              <Card className="h-100 recipe-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0">
                      {recipe.recipe_name}
                    </Card.Title>
                    <span className={getPercentageBadgeClasses(recipe)}>
                      {recipe.missing_all_ingredients
                        ? "Missing All"
                        : `${recipe.availability_percentage}% Available`}
                    </span>
                  </div>
                  <h6 className="mt-3">Ingredients:</h6>
                  <div className="ingredients-list">
                    {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className={`badge me-1 mb-1 ${
                          ingredient.has
                            ? "bg-success text-white"
                            : "bg-secondary text-white"
                        }`}
                      >
                        {ingredient.name}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span className="badge bg-light text-dark">
                        +{recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                  <Button variant="warning" className="w-100 mt-3">
                    View Recipe
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center p-5 custom-card-shadow">
          <div className="mx-auto mb-4 rounded-circle bg-amber-100 d-flex align-items-center justify-content-center icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-amber-600"
            >
              <path d="M14 22H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8" />
              <path d="M13.3 2H13v10h10V7.7" />
              <path d="m13 5.5 7.5 7.5" />
            </svg>
          </div>
          <h4 className="mb-3">No recipes found for this category.</h4>
          <p className="text-muted mb-4 mx-auto max-w-md">
            Try adjusting your ingredients or switching to a different category.
          </p>
        </Card>
      )}
    </div>
  );
};

export default RecipesPage;
