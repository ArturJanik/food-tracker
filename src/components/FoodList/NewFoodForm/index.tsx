import { FunctionalComponent, h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { FoodDraft } from '../../../models/Food.model';
import { createFood } from '../../../store/foods';
import { resetSidebar } from '../../../store/sidebar';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import style from './style.css';

export const NewFoodForm: FunctionalComponent = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [kcal, setKcal] = useState(0);
    const [prot, setProt] = useState(0);
    const [error, setError] = useState(false);

    const validateForm = (): boolean => {
        if (name?.length <= 0) {
            return false;
        }
        if (isNaN(amount) || amount <= 0) {
            return false;
        }
        if (unit?.length <= 0) {
            return false;
        }
        if (isNaN(kcal) || kcal <= 0) {
            return false;
        }
        if (isNaN(prot)) {
            return false;
        }
        return true;
    }

    const saveFood = () => {
        const valid = validateForm();
        if (valid) {
            setError(false);
            const newFood: FoodDraft = { name, amount, unit, kcal, prot };
            createFood(newFood);
            resetSidebar();
        } else {
            setError(true);
        }
    }

    return (
        <>
            <div class={style.title}>Create new food</div>
            <Input
                type="text"
                id="foodName"
                name="foodName" 
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder="Food name"
                value={name}
                classes={style.field}
            />
            <div class={style.row}>
                <Input
                    type="number"
                    id="foodAmount"
                    name="foodAmount" 
                    onInput={(e) => setAmount(parseFloat((e.currentTarget.value).replace(',','.')))}
                    placeholder="Amount"
                    value={amount}
                />
                <Input
                    type="text"
                    id="foodUnit"
                    name="foodUnit" 
                    onInput={(e) => setUnit(e.currentTarget.value)}
                    placeholder="Unit"
                    value={unit}
                />
            </div>
            <div class={style.row}>
                <Input
                    type="number"
                    id="foodKcal"
                    name="foodKcal" 
                    onInput={(e) => setKcal(parseInt(e.currentTarget.value, 10))}
                    placeholder="kcal"
                    value={kcal === 0 ? undefined : kcal}
                />
                <Input
                    type="number"
                    id="foodProt"
                    name="foodProt" 
                    onInput={(e) => setProt(parseFloat((e.currentTarget.value).replace(',','.')))}
                    placeholder="g of protein"
                    value={prot === 0 ? undefined : prot}
                />
            </div>
            { error && <div class={style.errorMsg}>One or more fields is invalid</div>}
            <Button classes={style.btn} onClick={saveFood}>Save</Button>
        </>
    );
};
