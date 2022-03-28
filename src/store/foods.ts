import { action, atom } from 'nanostores';
import { FoodModel } from '../models/Food.model';
import { FoodNoteModel } from '../models/FoodNote.model';
import { selectedDate } from './settings';

interface CreateFoodActionPayload {
    name: string;
    kcal: number;
    prot: number;
    unit: string;
    amount: number;
}

const initialState: FoodModel[] = [
    { id: 1, name: 'Valio', kcal: 140, prot: 20, unit: 'szt', amount: 1 },
    { id: 2, name: 'Chleb pszenny', kcal: 26, prot: 1, unit: 'g', amount: 10 },
    { id: 3, name: 'Ser edam rycki', kcal: 35, prot: 2.6, unit: 'g', amount: 10 },
    { id: 4, name: 'Kawa z mlekiem', kcal: 90, prot: 5, unit: 'szt', amount: 1 },
    { id: 5, name: 'Białko', kcal: 130, prot: 26, unit: 'szt', amount: 1 },
    { id: 6, name: 'Fruvita', kcal: 170, prot: 18, unit: 'szt', amount: 1 },
    { id: 7, name: 'Mus jabłko', kcal: 100, prot: 0, unit: 'szt', amount: 1 },
];

export const foods = atom<FoodModel[]>(initialState);
export const lastFoodId = atom<number>(7);

export const createFood = action(foods, 'Create Food', (store, data: CreateFoodActionPayload) => {
    const { name, kcal, prot, unit, amount } = data;
    console.log(data)

    const newId = lastFoodId.get() + 1;
    const food = {
        id: newId,
        name,
        kcal,
        prot,
        unit,
        amount,
    };

    store.set([...store.get(), food]);
    lastFoodId.set(newId);
});
