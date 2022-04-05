import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { FoodModel } from '../../models/Food.model';
import { addNote } from '../../store/foodnotes';
import { selectedDate } from '../../store/settings';
import DateSelector from './DateSelector';
import Food from './Food';
import NewFormTile from './NewFoodTile';
import style from './style.css';

interface FoodListProps {
    foods: FoodModel[];
}

const FoodList: FunctionalComponent<FoodListProps> = ({ foods }) => {
    const date = useStore(selectedDate);

    const addToFoodnotes = (foodId: string) => {
        addNote({ date, foodId });
    }

    return (
        <>
            <DateSelector />
            <div class={style.list}>
                {foods.map((food) => <Food data={food} onClick={addToFoodnotes} />)}
                <NewFormTile />
            </div>
        </>
    );
};

export default FoodList;
