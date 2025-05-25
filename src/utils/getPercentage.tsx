import { Recipe } from "../interface/Recipe";

 const getPercentageBadgeClasses = (recipe: Recipe) => {
    if (recipe.missing_all_ingredients) {
      return 'badge bg-danger text-white';
    } else if (recipe.availability_percentage === 100) {
      return 'badge bg-success text-white';
    } else {
      return 'badge bg-warning text-dark';
    }
  };

  export default getPercentageBadgeClasses;