import { action, atom } from 'nanostores';
import { getAllFoods, createFood } from '../api/foods';
import { FoodModel } from '../models/Food.model';

interface CreateFoodActionPayload {
    name: string;
    kcal: number;
    prot: number;
    unit: string;
    amount: number;
}

export const foods = atom<FoodModel[]>([]);
export const foodsLoading = atom(false);

export const getFoods = action(foods, 'Get All Foods', (store) => {
    foodsLoading.set(true);

    getAllFoods()
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

export const createNewFood = action(foods, 'Create Food', (store, data: CreateFoodActionPayload) => {
    foodsLoading.set(true);

    createFood(data)
        .then((food: FoodModel) => store.set([...store.get(), food]))
        .catch((err) => console.log(err))
        .finally(() => foodsLoading.set(false));
});
