import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { notedFoods } from '../../store/foodnotes';
import { removeNote } from '../../store/foodnotes';
import { selectedDate } from '../../store/settings';
import style from './style.css';

const NoteList: FunctionalComponent = () => {
    const date = useStore(selectedDate);
    const foods = useStore(notedFoods);

    const deleteFoodnode = (foodId: number) => {
        removeNote({ date, foodId });
    }

    return (
        <>
            <div class={style.title}>{date.toLocaleDateString()} foods</div>
            <div class={style.list}>
                {foods.map((food) => <div class={style.food}>
                    <div class={style.name}>{food.name} ({food.amount}{food.unit})</div>
                    <div class={style.kcal}>{food.kcal}kcal</div>
                    <div class={style.prot}>{food.prot}g</div>
                    <div onClick={() => deleteFoodnode(food.id)} class={style.btn}>remove</div>
                </div>)}
            </div>
        </>
    );
};

export default NoteList;
