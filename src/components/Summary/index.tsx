import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {  totalKcal, totalProt } from '../../store/foodnotes';
import { kcalGoal, protGoal } from '../../store/settings';
import { resetSidebar, runSidebar, sidebar } from '../../store/sidebar';
import NoteList from '../NoteList';
import Button from '../UI/Button';
import style from './style.css';

const Summary: FunctionalComponent = () => {
    const { type } = useStore(sidebar);

    const [kcalBarWidth, setKcalBarWidth] = useState(0);
    const [protBarWidth, setProtBarWidth] = useState(0);
    const targetKcal = useStore(kcalGoal);
    const targetProt = useStore(protGoal);
    const kcal = useStore(totalKcal);
    const prot = useStore(totalProt);

    useEffect(() => {
        let kBarWidth = (kcal/targetKcal) * 100;
        let pBarWidth = (prot/targetProt) * 100;
        if (kBarWidth > 100) {
            kBarWidth = 100;
        }
        if (pBarWidth > 100) {
            pBarWidth = 100;
        }
        setKcalBarWidth(kBarWidth);
        setProtBarWidth(pBarWidth);

    }, [kcal, prot]);
    
    const toggleNotesList = () => {
        if (type === 'INACTIVE') {
            runSidebar(<NoteList />);
        } else {
            resetSidebar();
        }
    }

    const kcalBarClass = kcalBarWidth === 100 ? style.redBar : style.bar;

    return (
        <div class={style.summary}>
            <div class={style.barContainer}>
                <div class={kcalBarClass} style={{ width: kcalBarWidth + '%' }}></div>
                <div class={style.text}>Kcal: {Math.floor(kcal)}/{targetKcal}kcal</div>
            </div>
            <div class={style.flexWrapper}>
                <div class={style.barContainer}>
                    <div class={style.bar} style={{ width: protBarWidth + '%' }}></div>
                    <p class={style.text}>Prot: {Math.floor(prot)}/{targetProt}g</p>
                </div>
                <Button onClick={toggleNotesList}>All notes</Button>
            </div>
        </div>
    );
};

export default Summary;
