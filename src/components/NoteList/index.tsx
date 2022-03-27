import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { FoodModel } from '../../models/Food.model';
import { addNote } from '../../store/foodnotes';
import { selectedDate } from '../../store/settings';
import style from './style.css';

interface NoteListProps {
    foods: FoodModel[];
}

const NoteList: FunctionalComponent<NoteListProps> = ({ foods }) => {
    const date = useStore(selectedDate);

    const deleteFoodnode = (foodId: number) => {
        // addNote({ date, foodId });
    }

    return (
        <>
            <div class={style.list}>
            </div>
        </>
    );
};

export default NoteList;
