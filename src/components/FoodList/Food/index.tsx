import { FunctionalComponent, h } from 'preact';
import { FoodModel } from '../../../models/Food.model';
import style from './style.css';

interface FoodProps {
    data: FoodModel;
    onClick: (id: string) => void;
}

export const Food: FunctionalComponent<FoodProps> = ({ data, onClick }) => {
    const { id, name, kcal, amount, unit, prot } = data;
    return (
        <div class={style.item} onClick={() => onClick(id)} tabIndex={0} aria-label={`${amount}${unit} of ${name}`}>
            <div class={style.name}>{name} (<span class={style.amount}>{amount}{unit}</span>)</div>
            <div class={style.data}>
                <div class={style.kcal}>{kcal}kcal</div>
                <div class={style.prot}>Prot: {prot}g</div>
            </div>
        </div>
    );
};
