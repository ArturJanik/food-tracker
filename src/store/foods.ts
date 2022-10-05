import { action, atom } from 'nanostores';
import { API_URL } from '../config/consts';
import { FoodModel } from '../models/Food.model';

interface CreateFoodActionPayload {
    name: string;
    kcal: number;
    prot: number;
    unit: string;
    amount: number;
}

interface GetFoodsResponse {
    foods: FoodModel[];
}

export const foods = atom<FoodModel[]>([]);
export const foodsLoading = atom(false);

export const getFoods = action(foods, 'Get All Foods', (store) => {
    foodsLoading.set(true);
    fetch(`${API_URL}/food/all`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then<GetFoodsResponse>((res) => res.json())
    .then((res) => {
        if ('error' in res) {
            console.log('error:', res);
            foodsLoading.set(false);
        } else {
            const { foods } = res;
            store.set(foods);
            foodsLoading.set(false);
        }
    });
});

export const createFood = action(foods, 'Create Food', (store, data: CreateFoodActionPayload) => {
    const { name, kcal, prot, unit, amount } = data;
    
    fetch(`${API_URL}/food`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, kcal, prot, unit, amount }),
    })
    .then((res) => res.json())
    .then((food: FoodModel) => store.set([...store.get(), food]))
    .catch((err) => console.log(err));
});
