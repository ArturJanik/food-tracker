import { FunctionalComponent, h } from 'preact';
import { FoodModel } from '../../../models/Food.model';
import style from './style.css';

interface FoodProps {
    data: FoodModel;
    onClick: (id: number) => void;
}

const Food: FunctionalComponent<FoodProps> = ({ data, onClick }) => {
    const { id, name, kcal, amount, unit, prot } = data;
    return (
        <div class={style.item} onClick={() => onClick(id)}>
            <div>{name}</div>
            <div>{amount}{unit}</div>
            <div>{kcal}kcal</div>
            <div>Prot: {prot}g</div>
        </div>
    );
};

export default Food;
