import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { selectedDate, setNextDay, setPrevDay } from '../../../store/settings';
import style from './style.css';

export const DateSelector: FunctionalComponent = () => {
    const date = useStore(selectedDate);

    const selectNextDay = () => {
        setNextDay();
    }
    
    const selectPrevDay = () => {
        setPrevDay();
    }

    return (
        <div class={style.dateSelector}>
            <div class={style.btn} onClick={selectPrevDay} role="button" aria-label="previous day">&laquo;</div>
            <div class={style.date} aria-label="selected date">{date.toLocaleDateString()}</div>
            <div class={style.btn} onClick={selectNextDay} role="button" aria-label="next day">&raquo;</div>
        </div>
    );
};
