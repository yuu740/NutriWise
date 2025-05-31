import React, { FC, useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/recipe.css";
import { ApiService } from "../constant/ApiService";
import { Recipe, RecipeResDTO } from "../interface/Recipe";
import { Button, Card, Pagination, Spinner } from "react-bootstrap";
import getPercentageBadgeClasses from "../utils/getPercentage";
import { ModalRecipeDetail } from "./ModalRecipeDetail";

interface RecipesPageProps {
  username?: string;
}

const RecipesPage: FC<RecipesPageProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState("canMakeNow");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRecipeDetailModal, setShowRecipeDetailModal] = useState(false);
  const [selectedRecipeDetail, setSelectedRecipeDetail] =
    useState<Recipe | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

  const processRecipes = useCallback((recipe: RecipeResDTO[]): Recipe[] => {
    return recipe.map((recipe, index) => {
      const availableCount = recipe.available_ingredients.length;
      console.log("This is available count : ", availableCount);
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
        ingredient_details: recipe.ingredient_details,
        recipe_steps: recipe.recipe_steps,
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

      const sortedRecipes = [...processed].sort((a, b) => {
        if (b.availability_percentage !== a.availability_percentage) {
          return b.availability_percentage - a.availability_percentage;
        }

        return a.recipe_name.localeCompare(b.recipe_name);
      });
      console.log("This is processed:", sortedRecipes);
      setRecipes(sortedRecipes);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

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

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

   const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      items.push(<Pagination.Item key={1} onClick={() => paginate(1)}>1</Pagination.Item>);
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }
      items.push(<Pagination.Item key={totalPages} onClick={() => paginate(totalPages)}>{totalPages}</Pagination.Item>);
    }

    return items;
  };


  const handleViewRecipeClick = useCallback((recipe: Recipe) => {
    setSelectedRecipeDetail(recipe);
    setShowRecipeDetailModal(true);
  }, []);

  const handleCloseRecipeDetailModal = useCallback(() => {
    setShowRecipeDetailModal(false);
    setSelectedRecipeDetail(null);
  }, []);

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
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {currentRecipes.map((recipe) => (
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
                        <span
                          className="badge bg-light text-dark view-more-ingredients"
                          onClick={() => handleViewRecipeClick(recipe)}
                          style={{ cursor: "pointer" }}
                        >
                          +{recipe.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                    <Button
                      variant="warning"
                      className="w-100 mt-3"
                      onClick={() => handleViewRecipeClick(recipe)}
                    >
                      View Recipe
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {renderPaginationItems()} 

                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
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
      {selectedRecipeDetail && (
        <ModalRecipeDetail
          show={showRecipeDetailModal}
          onClose={handleCloseRecipeDetailModal}
          recipeTitle={selectedRecipeDetail.recipe_name}
          ingredients={selectedRecipeDetail.ingredients}
          ingredientDetails={selectedRecipeDetail.ingredient_details}
          recipeSteps={selectedRecipeDetail.recipe_steps}
        />
      )}
    </div>
  );
};

export default RecipesPage;
