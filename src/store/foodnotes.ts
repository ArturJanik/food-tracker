import { action, atom } from 'nanostores';
import { FoodModel } from '../models/Food.model';
import { FoodNoteModel } from '../models/FoodNote.model';
import { foods } from './foods';
import { selectedDate } from './settings';

interface FoodnoteActionPayload {
    date: Date;
    foodId: number;
}

export const foodNotes = atom<FoodNoteModel[]>([]);
export const notedFoods = atom<FoodModel[]>([]);
export const lastFoodNoteId = atom<number>(0);
export const totalKcal = atom<number>(0);
export const totalProt = atom<number>(0);

export const addNote = action(foodNotes, 'Add Foodnote', (store, { date, foodId }: FoodnoteActionPayload) => {
    const stringDate = date.toLocaleDateString();

    let note = store.get().find((n) => n.date === stringDate);
    if (note) {
        note = { ...note, foodIds: [...note.foodIds, foodId] };
        store.set(store.get().map((n) => n.id === note?.id ? note : n));
    } else {
        const newId = lastFoodNoteId.get() + 1;
        note = {
            id: newId,
            date: stringDate,
            foodIds: [foodId],
        };
        store.set([...store.get(), note]);
        lastFoodNoteId.set(newId);
    }

    updateTotals(stringDate);
});

export const removeNote = action(foodNotes, 'Remove Foodnote', (store, { date, foodId }: FoodnoteActionPayload) => {
    const stringDate = date.toLocaleDateString();

    const notes = store.get();
    const note = notes.find((n) => n.date === stringDate);

    if (note) {
        const noteIndex = notes.findIndex((n) => n.id === note?.id);
        const updatedFoods = note.foodIds.filter((id, index) => index !== note.foodIds.indexOf(foodId));
        store.set([
            ...notes.slice(0, noteIndex),
            { ...note, foodIds: updatedFoods },
            ...notes.slice(noteIndex + 1),
        ]);
    }
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
    if (note) {
        note.foodIds.forEach((foodId) => {
            const food = foods.get().find((f) => f.id === foodId);
            if (food) {
                notes.push(food);
            }
        });
    }

    notedFoods.set(notes);
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
