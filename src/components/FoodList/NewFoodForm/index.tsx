import { FunctionalComponent, h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { FoodDraft } from '../../../models/Food.model';
import { createFood } from '../../../store/foods';
import { resetSidebar } from '../../../store/sidebar';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import style from './style.css';

const NewFoodForm: FunctionalComponent = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [kcal, setKcal] = useState(0);
    const [prot, setProt] = useState(0);

    const validateForm = (): boolean => {
        if (name?.length <= 0) {
            return false;
        }
        if (amount <= 0) {
            return false;
        }
        if (unit?.length <= 0) {
            return false;
        }
        if (kcal <= 0) {
            return false;
        }
        return true;
    }

    const saveFood = () => {
        const valid = validateForm();
        if (valid) {
            const newFood: FoodDraft = { name, amount, unit, kcal, prot };
            createFood(newFood);
            resetSidebar();
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
                    onInput={(e) => setAmount(parseInt(e.currentTarget.value))}
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
                    onInput={(e) => setKcal(parseInt(e.currentTarget.value))}
                    placeholder="kcal"
                    value={kcal === 0 ? undefined : kcal}
                />
                <Input
                    type="number"
                    id="foodProt"
                    name="foodProt" 
                    onInput={(e) => setProt(parseInt(e.currentTarget.value))}
                    placeholder="g of protein"
                    value={prot === 0 ? undefined : prot}
                />
            </div>
            <Button classes={style.btn} onClick={saveFood}>Save</Button>
        </>
    );
};

export default NewFoodForm;
