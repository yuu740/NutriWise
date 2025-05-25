import { Moment } from "moment";

export interface FoodlistResDTO {
    log_id: string;
    food_name: string;
    quantity: number;
    exp_date: string;
    is_deleted: boolean;
}

export interface FoodListTable {
    log_id: string;
    food_name: string;
    quantity: number;
    expiry_date: Date;
    status: string;
}

export interface AddFood {
    food_name?: string;
    quantity?: number;
    expiry_date?: Moment;
}

export interface AddFoodReqDTO {
    username: string;
    food_name: string;
    quantity: number;
    expiry_date: string;
}

export interface DelFoodReqDTO{
        username: string;
    log_id: string;
}