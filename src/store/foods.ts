import { action, atom, WritableAtom } from 'nanostores';
import { getAllFoods, createFood } from '../api/foodsDAO';
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

const startLoadingFoods = () => foodsLoading.set(true);

const finishLoadingFoods = () => foodsLoading.set(false);

const populateStoreWithFoods = (foods: FoodModel[], store: WritableAtom<FoodModel[]>) => store.set(foods);

const addNewFoodToStore = (store: WritableAtom<FoodModel[]>) => (food: FoodModel) => store.set([...store.get(), food]);

export const getFoods = action(foods, 'Get All Foods', (store) => {
    startLoadingFoods();

    getAllFoods()
        .then((res) => {
            if ('error' in res) {
                console.log('error:', res);
            } else {
                populateStoreWithFoods(res.foods, store);
            }
        })
        .finally(finishLoadingFoods);
});

export const createNewFood = action(foods, 'Create Food', (store, data: CreateFoodActionPayload) => {
    startLoadingFoods();

    createFood(data)
        .then(addNewFoodToStore(store))
        .catch((err) => console.log(err))
        .finally(finishLoadingFoods);
});
