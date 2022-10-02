import { action, atom } from 'nanostores';
import { FoodModel } from '../models/Food.model';
import { FoodNoteModel } from '../models/FoodNote.model';
import { foods } from './foods';
import { selectedDate } from './settings';


interface GetFoodnotesResponse {
    foodnotes: FoodNoteModel[];
}
interface FoodnoteActionPayload {
    date: Date;
    foodId: string;
}

const API_URL = 'https://api.codeplayground.usermd.net/api';

export const foodNotes = atom<FoodNoteModel[]>([]);
export const notedFoods = atom<FoodModel[]>([]);
export const foodnotesLoading = atom(false);
export const totalKcal = atom<number>(0);
export const totalProt = atom<number>(0);

export const getFoodnotes = action(foodNotes, 'Get All Foodnotes', (store) => {
    foodnotesLoading.set(true);
    fetch(`${API_URL}/foodnote/all`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then<GetFoodnotesResponse>((res) => res.json())
    .then((res) => {
        if ('error' in res) {
            console.log('error:', res);
        } else {
            const { foodnotes } = res;
            store.set(foodnotes);
        }
        foodnotesLoading.set(false);
    });
});

export const addNote = action(foodNotes, 'Add Foodnote', (store, { date, foodId }: FoodnoteActionPayload) => {
    const stringDate = date.toLocaleDateString();
    
    fetch(`${API_URL}/foodnote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: stringDate, foodId }),
    })
    .then((res) => res.json())
    .then((foodnote: FoodNoteModel) => {
        const toUpdate = store.get().filter((note) => note.date !== stringDate);
        store.set([...toUpdate, foodnote]);
    })
    .catch((err) => console.log(err));
});

export const removeNote = action(foodNotes, 'Remove Foodnote', (store, { date, foodId }: FoodnoteActionPayload) => {
    const stringDate = date.toLocaleDateString();

    fetch(`${API_URL}/foodnote/remove-food`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodId, date: stringDate }),
    })
    .then((res) => res.json())
    .then((foodnote: FoodNoteModel) => {
        const toUpdate = store.get().filter((note) => note.date !== stringDate);
        store.set([...toUpdate, foodnote]);
    })
    .catch((err) => console.log(err));
});

const updateTotals = (date: string) => {
    let sumKcal = 0;
    let sumProt = 0;

    const note = foodNotes.get().find((n) => n.date === date);
    if (note) {
        note.foodIds.forEach((id) => {
            const food = foods.get().find((f) => f.id === id);
            if (food) {
                sumKcal += food.kcal;
                sumProt += food.prot;
            }
        })
    }

    totalKcal.set(sumKcal);
    totalProt.set(sumProt);
}

const updateNotedFoods = (date: string) => {
    const notes: FoodModel[] = [];

    let note = foodNotes.get().find((n) => n.date === date);
    let reduced: FoodModel[] = [];
    if (note) {
        note.foodIds.forEach((foodId) => {
            const food = foods.get().find((f) => f.id === foodId);
            if (food) {
                notes.push(food);
            }
        });

        reduced = notes.reduce((acc, food) => {
            const foodIndex = acc.findIndex((el) => el.id === food.id);
            const foodExists = foodIndex > -1;
            if (foodExists) {
                const existingFood = acc[foodIndex];
                acc[foodIndex] = {
                    ...existingFood,
                    prot: existingFood.prot + food.prot,
                    kcal: existingFood.kcal + food.kcal,
                    amount: existingFood.amount + food.amount,
                };
                return acc;
            }
            return [...acc, food];
        }, [] as FoodModel[]);
    }

    notedFoods.set(reduced);
}

selectedDate.listen((newDate) => {
    const date = newDate.toLocaleDateString();
    updateTotals(date);
    updateNotedFoods(date);
});

foodNotes.listen(() => {
    const date = selectedDate.get().toLocaleDateString()
    updateTotals(date);
    updateNotedFoods(date);
});
