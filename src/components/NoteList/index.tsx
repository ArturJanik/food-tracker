import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { foodnotesLoading, notedFoods } from '../../store/foodnotes';
import { removeNote } from '../../store/foodnotes';
import { selectedDate } from '../../store/settings';
import Spinner from '../UI/Spinner';
import style from './style.css';

const NoteList: FunctionalComponent = () => {
    const date = useStore(selectedDate);
    const foods = useStore(notedFoods);
    const loading = useStore(foodnotesLoading);

    const deleteFoodnode = (foodId: string) => {
        removeNote({ date, foodId });
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div class={style.title}>{date.toLocaleDateString()} foods</div>
            <div class={style.list}>
                {foods.map((food) => <div class={style.food}>
                    <div class={style.name}>{food.name} ({Math.floor(food.amount)}{food.unit})</div>
                    <div class={style.kcal}>{Math.floor(food.kcal)}kcal</div>
                    <div class={style.prot}>{Math.floor(food.prot)}g</div>
                    <div onClick={() => deleteFoodnode(food.id)} class={style.btn}>remove</div>
                </div>)}
            </div>
        </>
    );
};

export default NoteList;
