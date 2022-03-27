import { action, atom } from 'nanostores';
import { FoodModel } from '../models/Food.model';
import { FoodNoteModel } from '../models/FoodNote.model';
import { selectedDate } from './settings';

const foods: FoodModel[] = [
    { id: 1, name: 'Valio', kcal: 140, prot: 20, unit: 'szt', amount: 1 },
    { id: 2, name: 'Chleb pszenny', kcal: 26, prot: 1, unit: 'g', amount: 10 },
    { id: 3, name: 'Ser edam rycki', kcal: 35, prot: 2.6, unit: 'g', amount: 10 },
    { id: 4, name: 'Kawa z mlekiem', kcal: 90, prot: 5, unit: 'szt', amount: 1 },
    { id: 5, name: 'Białko', kcal: 130, prot: 26, unit: 'szt', amount: 1 },
    { id: 6, name: 'Fruvita', kcal: 170, prot: 18, unit: 'szt', amount: 1 },
    { id: 7, name: 'Mus jabłko', kcal: 100, prot: 0, unit: 'szt', amount: 1 },
];

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
            const food = foods.find((f) => f.id === id);
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
            const food = foods.find((f) => f.id === foodId);
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
