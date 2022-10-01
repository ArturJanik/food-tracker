import { rest } from 'msw';
import { setupServer } from 'msw/node';
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
    foodIds: ['abcdef1234'],
};

const getDummyServer = () => setupServer(
    rest.get('https://api.codeplayground.usermd.net/api/food/all', (req, res, ctx) => {
      return res(ctx.json({foods: [dummyFood]}))
    }),
    rest.get('https://api.codeplayground.usermd.net/api/foodnote/all', (req, res, ctx) => {
        return res(ctx.json({foodnotes: [dummyFoodNote]}))
    }),
);

export {
    getDummyServer,
};
