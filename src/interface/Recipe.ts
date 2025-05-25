export interface RecipeResDTO {
  available_ingredients: string[];
  ingredient_details: string[];
  recipe_steps: string[];
  recipe_title: string;
  total_ingredients: number;
  unavailable_ingredients: string[];
}
export interface Recipe {
  recipe_id: string;
  recipe_name: string;
  ingredients: { name: string; has: boolean }[];
  availability_percentage: number;
  missing_all_ingredients: boolean;
  can_make_now: boolean;
  ingredient_details: string[];
  recipe_steps: string[];
}
