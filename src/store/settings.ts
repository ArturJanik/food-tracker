import { action, atom } from 'nanostores';

type SetKcalGoalActionPayload = { goal: number };
type SetProtGoalActionPayload = { goal: number };

export const selectedDate = atom<Date>(new Date(Date.now()));
export const kcalGoal = atom<number>(1600);
export const protGoal = atom<number>(140);

export const setKcalGoal = action(kcalGoal, 'Set Kcal Goal', (store, { goal }: SetKcalGoalActionPayload) => {
    store.set(goal);
});

export const setProtGoal = action(protGoal, 'Set Prot Goal', (store, { goal }: SetProtGoalActionPayload) => {
    store.set(goal);
});

export const setNextDay = action(selectedDate, 'Set Next Day', (store) => {
    const newDate = store.get().setDate(store.get().getDate() + 1);
    store.set(new Date(newDate));
});

export const setPrevDay = action(selectedDate, 'Set Prev Day', (store) => {
    const newDate = store.get().setDate(store.get().getDate() - 1);
    store.set(new Date(newDate));
});
