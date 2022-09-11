import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { FoodModel } from '../../models/Food.model';
import { addNote } from '../../store/foodnotes';
import { selectedDate } from '../../store/settings';
import DateSelector from './DateSelector';
import Food from './Food';
import { NameFilter } from './NameFilter';
import NewFormTile from './NewFoodTile';
import style from './style.css';

interface FoodListProps {
    foods: FoodModel[];
}

const filterByName = (foodList: FoodModel[], query: string): FoodModel[] =>
    foodList.filter((food) => food.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);

const FoodList: FunctionalComponent<FoodListProps> = ({ foods }) => {
    const date = useStore(selectedDate);
    const [searchQuery, setSearchQuery] = useState('');

    const addToFoodnotes = (foodId: string) => {
        addNote({ date, foodId });
    }

    return (
        <>
            <DateSelector />
            <NameFilter
                onInput={setSearchQuery}
                searchQuery={searchQuery}
            />
            <div class={style.list}>
                {filterByName(foods, searchQuery).map((food) => <Food data={food} onClick={addToFoodnotes} />)}
                <NewFormTile />
            </div>
        </>
    );
};

export default FoodList;
