import { action, atom, WritableAtom } from 'nanostores';
import { addFoodnote, getAllFoodnotes, removeFoodnoteFood } from '../api/foodnotesDAO';
import { FoodModel } from '../models/Food.model';
import { FoodNoteModel } from '../models/FoodNote.model';
import { foods } from './foods';
import { selectedDate } from './settings';

interface FoodnoteActionPayload {
    date: Date;
    foodId: string;
}

export const foodNotes = atom<FoodNoteModel[]>([]);
export const notedFoods = atom<FoodModel[]>([]);
export const foodnotesLoading = atom(false);
export const totalKcal = atom<number>(0);
export const totalProt = atom<number>(0);

const startLoadingFoodnotes = () => foodnotesLoading.set(true);

const finishLoadingFoodnotes = () => foodnotesLoading.set(false);

const populateStoreWithFoodnotes = (foodnotes: FoodNoteModel[], store: WritableAtom<FoodNoteModel[]>) => store.set(foodnotes);

export const getFoodnotes = action(foodNotes, 'Get All Foodnotes', (store) => {
    startLoadingFoodnotes();

    getAllFoodnotes()
        .then((res) => {
            if ('error' in res) {
                console.log('error:', res);
            } else {
                populateStoreWithFoodnotes(res.foodnotes, store);
            }
        })
        .finally(finishLoadingFoodnotes);
});

export const addNote = action(foodNotes, 'Add Foodnote', (store, { date, foodId }: FoodnoteActionPayload) => {
    addFoodnote(foodId, date)
        .then((foodnote: FoodNoteModel) => {
            const stringDate = date.toLocaleDateString();
            const toUpdate = store.get().filter((note) => note.date !== stringDate);
            store.set([...toUpdate, foodnote]);
        })
        .catch((err) => console.log(err));
});

export const removeNote = action(foodNotes, 'Remove Foodnote', (store, { date, foodId }: FoodnoteActionPayload) => {
    removeFoodnoteFood(foodId, date)
        .then((foodnote: FoodNoteModel) => {
            const stringDate = date.toLocaleDateString();
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

    const note = foodNotes.get().find((n) => n.date === date);
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

export const resetStore = () => {
    foodNotes.set([]);
    notedFoods.set([]);
    finishLoadingFoodnotes();
    totalKcal.set(0);
    totalProt.set(0);
};
