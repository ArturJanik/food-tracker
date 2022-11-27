import { API_URL } from '../config/consts';
import { FoodNoteModel } from '../models/FoodNote.model';

interface GetAllFoodnotesResponse {
    foodnotes: FoodNoteModel[];
}

export const getAllFoodnotes = () => fetch(`${API_URL}/foodnote/all`, {
    headers: {
        'Content-Type': 'application/json',
    },
})
.then<GetAllFoodnotesResponse>((res) => res.json());

export const addFoodnote = (foodId: string, date: Date) => {
    const stringDate = date.toLocaleDateString();

    return fetch(`${API_URL}/foodnote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: stringDate, foodId }),
    })
    .then<FoodNoteModel>((res) => res.json());
};

export const removeFoodnoteFood = (foodId: string, date: Date) => {
    const stringDate = date.toLocaleDateString();

    return fetch(`${API_URL}/foodnote/remove-food`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodId, date: stringDate }),
    })
    .then<FoodNoteModel>((res) => res.json());
};
