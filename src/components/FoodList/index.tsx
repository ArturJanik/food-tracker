import { FunctionalComponent, h } from 'preact';
import { FoodModel } from '../../models/Food.model';
import { addNote } from '../../store/foodnotes';
import Food from './Food';
import style from './style.css';

const foods: FoodModel[] = [
    { id: 1, name: 'Valio', kcal: 140, prot: 20, unit: 'szt', amount: 1 },
    { id: 2, name: 'Chleb pszenny', kcal: 26, prot: 1, unit: 'g', amount: 10 },
    { id: 3, name: 'Ser edam rycki', kcal: 35, prot: 2.6, unit: 'g', amount: 10 },
    { id: 4, name: 'Kawa z mlekiem', kcal: 90, prot: 5, unit: 'szt', amount: 1 },
    { id: 5, name: 'Białko', kcal: 130, prot: 26, unit: 'szt', amount: 1 },
    { id: 6, name: 'Fruvita', kcal: 170, prot: 18, unit: 'szt', amount: 1 },
    { id: 7, name: 'Mus jabłko', kcal: 100, prot: 0, unit: 'szt', amount: 1 },
];

const FoodList: FunctionalComponent = () => {

    const addToFoodnotes = (foodId: number) => {
        addNote({ foodId });
    }

    return (
        <div class={style.list}>
            {foods.map((food) => <Food data={food} onClick={addToFoodnotes} />)}
        </div>
    );
};

export default FoodList;
