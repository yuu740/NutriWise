//Calculator Table / Calculator Response DTO
export interface CalculatorTable {
  log_id: string;
  food_name: string;
  quantity: number;
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
}

export interface AddFoodCal {
  food_name?: string;
  quantity?: number;
}

export interface AddFoodCalReqDTO {
  username: string;
  food_name: string;
  quantity: number;
}

export interface DelFoodCalReqDTO {
  username: string;
  log_id: string;
}
