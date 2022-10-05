import { cleanStores, keepMount } from 'nanostores'
import {
    selectedDate,
    kcalGoal,
    protGoal,
    setKcalGoal,
    setProtGoal,
    setNextDay,
    setPrevDay,
    resetStore,
} from '../settings';

const ONE_DAY_IN_MS = 86400000;

describe('settings store', () => {
    afterEach(() => {
        cleanStores(selectedDate, kcalGoal, protGoal);
        resetStore();
    });
    
    it('should set default values on initialization', () => {
        // given
        keepMount(selectedDate);
        keepMount(kcalGoal);
        keepMount(protGoal);

        // then
        expect(selectedDate.get()).toBeDefined();
        expect(kcalGoal.get()).toEqual(1600);
        expect(protGoal.get()).toEqual(140);
    });

    it('should handle setting kcal goal', () => {
        // given
        keepMount(kcalGoal);

        // when
        setKcalGoal({ goal: 2200 });

        // then
        expect(kcalGoal.get()).toEqual(2200);
    });

    it('should handle setting protein goal', () => {
        // given
        keepMount(protGoal);

        // when
        setProtGoal({ goal: 180 });

        // then
        expect(protGoal.get()).toEqual(180);
    });

    it('should handle switching to next day', () => {
        // given
        keepMount(selectedDate);
        const nextDay = new Date(Date.now() + ONE_DAY_IN_MS).getDate();

        // when
        setNextDay();

        // then
        expect(selectedDate.get().getDate()).toEqual(nextDay);
    });

    it('should handle switching to previous day', () => {
        // given
        keepMount(selectedDate);
        const prevDay = new Date(Date.now() - ONE_DAY_IN_MS).getDate();

        // when
        setPrevDay();

        // then
        expect(selectedDate.get().getDate()).toEqual(prevDay);
    });
    
    it('should handle resetting store to initial state', () => {
        // given
        keepMount(selectedDate);
        keepMount(kcalGoal);
        keepMount(protGoal);
        const nextDay = new Date(Date.now() + ONE_DAY_IN_MS).getDate();

        // when
        setKcalGoal({ goal: 2200 });
        setProtGoal({ goal: 180 });
        setNextDay();

        // then
        expect(kcalGoal.get()).toEqual(2200);
        expect(protGoal.get()).toEqual(180);
        expect(selectedDate.get().getDate()).toEqual(nextDay);

        // when
        resetStore();

        // then
        expect(selectedDate.get().getDate()).toEqual(new Date(Date.now()).getDate());
        expect(kcalGoal.get()).toEqual(1600);
        expect(protGoal.get()).toEqual(140);
    });
});
