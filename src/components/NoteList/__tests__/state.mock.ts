import { FoodModel } from '../../../models/Food.model';

export const mockFoodnotesStore = () => {
    const originalModule = jest.requireActual('../../../store/foodnotes');

    const dummyFood: FoodModel = {
        id: '6248c1234a567be5b1c4b3d8',
        name: 'Potato',
        unit: 'g',
        amount: 100,
        kcal: 200,
        prot: 5,
    };

    const dummyFood_2: FoodModel = {
        ...dummyFood,
        name: 'Not potato',
        amount: 20,
        kcal: 130,
        prot: 10,
    };

    return {
        __esModule: true,
        ...originalModule,
        notedFoods: {
            ...originalModule.notedFoods,
            get: () => [dummyFood, dummyFood_2],
        },
        foodnotesLoading: {
            ...originalModule.foodnotesLoading,
            get: () => false,
        },
        removeNote: jest.fn(),
    };
};

export const mockSettingsStore = () => {
    const originalModule = jest.requireActual('../../../store/settings');

    return {
        __esModule: true,
        ...originalModule,
        selectedDate: {
            ...originalModule.selectedDate,
            get: () => new Date('2.04.2022'),
        },
    };
};
