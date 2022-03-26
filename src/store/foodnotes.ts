import { action, atom } from 'nanostores';
import { FoodNoteModel } from '../models/FoodNote.model';

interface AddFoodnoteActionPayload {
    foodId: number;
}

export const foodNotes = atom<FoodNoteModel[]>([]);
export const lastFoodNoteId = atom<number>(0);

export const addNote = action(foodNotes, 'Add Foodnote', (store, { foodId }: AddFoodnoteActionPayload) => {
    const date = new Date().toLocaleDateString();

    let note = store.get().find((n) => n.date === date);
    if (note) {
        note = { ...note, foodIds: [...note.foodIds, foodId] };
        store.set(store.get().map((n) => n.id === note?.id ? note : n));
    } else {
        const newId = lastFoodNoteId.get() + 1;
        note = {
            id: newId,
            date,
            foodIds: [foodId],
        };
        store.set([...store.get(), note]);
        lastFoodNoteId.set(newId);
    }
    console.log(store.get())
});
