import { FunctionalComponent, h } from 'preact';
import { FoodModel } from '../../../models/Food.model';
import style from './style.css';

interface NewFoodFormProps {
    date: Date;
}

const NewFoodForm: FunctionalComponent<NewFoodFormProps> = ({ date }) => {
    return (
        <div class={style.item}>
            <div>form</div>
        </div>
    );
};

export default NewFoodForm;
