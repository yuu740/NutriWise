import { Moment } from "moment";

export interface FoodlistResDTO {
    food_name: string;
    quantity: number;
    expiry_date: Date;
    is_deleted: boolean;
}

export interface FoodListTable {
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

export interface FoodReqDTO {
    username: string;
    food_name: string;
    quantity: number;
    expiry_date: string;

}