import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {  totalKcal, totalProt } from '../../store/foodnotes';
import { kcalGoal, protGoal } from '../../store/settings';
import style from './style.css';

const Summary: FunctionalComponent = () => {
    const [kcalBarWidth, setKcalBarWidth] = useState(0);
    const [protBarWidth, setProtBarWidth] = useState(0);
    const targetKcal = useStore(kcalGoal);
    const targetProt = useStore(protGoal);
    const kcal = useStore(totalKcal);
    const prot = useStore(totalProt);

    useEffect(() => {
        let kBarWidth = (kcal/targetKcal) * 100;
        let pBarWidth = (kcal/targetKcal) * 100;
        if (kBarWidth > 100) {
            kBarWidth = 100;
        }
        if (pBarWidth > 100) {
            pBarWidth = 100;
        }
        setKcalBarWidth(kBarWidth);
        setProtBarWidth(pBarWidth);

    }, [kcal, prot]);

    const kcalBarClass = kcalBarWidth === 100 ? style.redBar : style.bar;

    return (
        <div class={style.summary}>
            <div class={style.barContainer}>
                <div class={kcalBarClass} style={{ width: kcalBarWidth + '%' }}></div>
                <div class={style.text}>Kcal: {kcal}/{targetKcal}kcal</div>
            </div>
            <div class={style.barContainer}>
                <div class={style.bar} style={{ width: protBarWidth + '%' }}></div>
                <p class={style.text}>Prot: {prot}/{targetProt}g</p>
            </div>
        </div>
    );
};

export default Summary;
