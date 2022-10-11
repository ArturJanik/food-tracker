import { API_URL } from '../config/consts';
import { FoodModel } from '../models/Food.model';

interface GetAllFoodsResponse {
    foods: FoodModel[];
}

export const getAllFoods = () => fetch(`${API_URL}/food/all`, {
    headers: {
        'Content-Type': 'application/json',
    },
}).then<GetAllFoodsResponse>((res) => res.json());

interface CreateFoodBody {
    name: string;
    kcal: number;
    prot: number;
    unit: string;
    amount: number;
}

export const createFood = ({ name, kcal, prot, unit, amount }: CreateFoodBody) => fetch(`${API_URL}/food`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, kcal, prot, unit, amount }),
}).then<FoodModel>((res) => res.json());
