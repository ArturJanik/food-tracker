import { cleanStores, keepMount } from 'nanostores'
import {
    foodNotes,
    notedFoods,
    foodnotesLoading,
    totalKcal,
    totalProt,
    getFoodnotes,
    addNote,
    resetStore,
} from '../foodnotes';
import { waitFor } from '@testing-library/preact';

describe('foodnotes store', () => {
    beforeEach(() => resetStore());

    afterEach(() => {
        cleanStores(foodNotes);
        cleanStores(notedFoods);
        cleanStores(foodnotesLoading);
        cleanStores(totalKcal);
        cleanStores(totalProt);
    });
    
    it('should return default values', () => {
        // given
        keepMount(foodNotes);
        keepMount(notedFoods);
        keepMount(foodnotesLoading);
        keepMount(totalKcal);
        keepMount(totalProt);

        // then
        expect(foodNotes.get()).toEqual([]);
        expect(notedFoods.get()).toEqual([]);
        expect(foodnotesLoading.get()).toBeFalsy();
        expect(totalKcal.get()).toEqual(0);
        expect(totalProt.get()).toEqual(0);
    });
    
    it('should fetch foodnotes data', async () => {
        // given
        keepMount(foodNotes);
        keepMount(foodnotesLoading);

        // when
        getFoodnotes();

        // then
        expect(foodNotes.get()).toEqual([]);
        expect(foodnotesLoading.get()).toBeTruthy();

        await waitFor(() => {
            expect(foodNotes.get()).toHaveLength(1);
            expect(foodnotesLoading.get()).toBeFalsy();
        });
    });
    
    it('should create foodnote', async () => {
        // given
        keepMount(foodNotes);
        keepMount(notedFoods);

        // when
        addNote({
            date: new Date('2.04.2022'),
            foodId: '1234c1234a567be5b1c4b3d8',
        });

        // then
        await waitFor(() => {
            expect(foodNotes.get()).toHaveLength(1);
        });
    });
});
