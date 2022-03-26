import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { FoodModel } from '../../models/Food.model';
import { foodNotes, totalKcal, totalProt } from '../../store/foodnotes';
import { kcalGoal, protGoal } from '../../store/settings';
import style from './style.css';

const Summary: FunctionalComponent = () => {
    const targetKcal = useStore(kcalGoal);
    const targetProt = useStore(protGoal);
    const kcal = useStore(totalKcal);
    const prot = useStore(totalProt);

    return (
        <div class={style.summary}>
            <div>Kcal: {kcal}/{targetKcal}kcal</div>
            <div>Prot: {prot}/{targetProt}g</div>
        </div>
    );
};

export default Summary;
