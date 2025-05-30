import {
  AddFoodCalReqDTO,
  CalculatorTable,
  DelFoodCalReqDTO,
} from "../interface/Calcu";
import {
  FoodlistResDTO,
  AddFoodReqDTO,
  DelFoodReqDTO,
} from "../interface/Foodlist";

const API_BASE_URL = "https://taim.pythonanywhere.com";

export const ApiService = {
  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  },

  getFoodlistBasedUser: async (username: string | undefined) => {
    const response = await fetch(`${API_BASE_URL}/getFoodlistBasedUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  },

  addFoodList: async (addFoodDTO: AddFoodReqDTO) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addFood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFoodDTO),
      });
      if (response.ok) {
        const savedFood: FoodlistResDTO = await response.json();
      }
    } catch (error) {
      console.error("Failed to add food: ", error);
    }
  },
  deleteFoodList: async (deleteFoodDTO: DelFoodReqDTO) => {
    try {
      const response = await fetch(`${API_BASE_URL}/DeleteFood`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteFoodDTO),
      });
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error("Failed to delete food: ", error);
    }
  },

  getRecipeBasedUser: async (username: string | undefined) => {
    const response = await fetch(`${API_BASE_URL}/getRecipesWithAvailability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  },
  getCalorieBasedUser: async (username: string | undefined) => {
    const response = await fetch(`${API_BASE_URL}/getCalorieBasedUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  },
  addCalorie: async (addingCalorie: AddFoodCalReqDTO) => {
    try {
      const response = await fetch(`${API_BASE_URL}/calorie/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addingCalorie),
      });
      if (response.ok) {
        const savedFood: CalculatorTable = await response.json();
      }
    } catch (error) {
      console.error("Failed to add food: ", error);
    }
  },
  delCalorie: async (deleteCalorie: DelFoodCalReqDTO) => {
    try {
      const response = await fetch(`${API_BASE_URL}/calorie/delete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteCalorie),
      });
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error("Failed to delete food: ", error);
    }
  },
  getFoodListName: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getAllFoodNames`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error("Failed to get all food name:", error);
    }
  },
};
