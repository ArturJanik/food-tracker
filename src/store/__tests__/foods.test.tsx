import { cleanStores, keepMount } from 'nanostores'
import { foods, foodsLoading, getFoods, createFood } from '../foods';
import { getDummyServer } from '../../utils/test/dummyApi';
import { waitFor } from '@testing-library/preact';

describe('foods store', () => {
    const server = getDummyServer();

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    afterEach(() => {
        cleanStores(foods);
        cleanStores(foodsLoading);
    });
    
    it('should return default values', () => {
        // given
        keepMount(foods);
        keepMount(foodsLoading);

        // then
        expect(foods.get()).toEqual([]);
        expect(foodsLoading.get()).toBeFalsy();
    });
    
    it('should fetch food data', async () => {
        // given
        keepMount(foods);
        keepMount(foodsLoading);

        // when
        getFoods();

        // then
        expect(foods.get()).toEqual([]);
        expect(foodsLoading.get()).toBeTruthy();

        await waitFor(() => {
            expect(foods.get()).toHaveLength(1);
            expect(foodsLoading.get()).toBeFalsy();
        });
    });
    
    it('should create food', async () => {
        // given
        keepMount(foods);

        // when
        createFood({
            name: 'Dummy',
            kcal: 100,
            prot: 100,
            unit: 'g',
            amount: 100,
        });

        // then
        await waitFor(() => {
            expect(foods.get()).toHaveLength(2);
        });
    });
});
