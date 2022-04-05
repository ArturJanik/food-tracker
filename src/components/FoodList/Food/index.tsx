import { FunctionalComponent, h } from 'preact';
import { FoodModel } from '../../../models/Food.model';
import style from './style.css';

interface FoodProps {
    data: FoodModel;
    onClick: (id: string) => void;
}

const Food: FunctionalComponent<FoodProps> = ({ data, onClick }) => {
    const { id, name, kcal, amount, unit, prot } = data;
    return (
        <div class={style.item} onClick={() => onClick(id)}>
            <div class={style.name}>{name} (<span class={style.amount}>{amount}{unit}</span>)</div>
            <div class={style.data}>
                <div class={style.kcal}>{kcal}kcal</div>
                <div class={style.prot}>Prot: {prot}g</div>
            </div>
        </div>
    );
};

export default Food;
