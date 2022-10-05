import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '../../config/consts';
import { FoodModel } from '../../models/Food.model';
import { FoodNoteModel } from '../../models/FoodNote.model';

const dummyFood: FoodModel = {
    id: 'abcdef1234',
    name: 'Potato',
    unit: 'g',
    amount: 100,
    kcal: 200,
    prot: 5,
};

const dummyFoodNote: FoodNoteModel = {
    id: '6248c1234a567be5b1c4b3d8',
    date: '2.04.2022',
    foodIds: ['abcdef1234', 'abcdef1236'],
};

const getDummyServer = () => setupServer(
    rest.get(`${API_URL}/food/all`, (req, res, ctx) => {
      return res(ctx.json({foods: [dummyFood]}));
    }),
    rest.get(`${API_URL}/foodnote/all`, (req, res, ctx) => {
        return res(ctx.json({foodnotes: [dummyFoodNote]}));
    }),
    rest.post(`${API_URL}/foodnote`, (req, res, ctx) => {
        return res(ctx.json({ ...dummyFoodNote }));
    }),
    rest.put(`${API_URL}/foodnote/remove-food`, (req, res, ctx) => {
        return res(ctx.json({
            ...dummyFoodNote,
            foodIds: ['abcdef1234'],
        }));
    }),
    rest.post(`${API_URL}/food`, (req, res, ctx) => {
        return res(ctx.json({ ...dummyFood, id: 'abcdef6789', name: 'Cheese' }));
    }),
);

export {
    getDummyServer,
};
