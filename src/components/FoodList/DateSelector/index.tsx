import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { selectedDate, setNextDay, setPrevDay } from '../../../store/settings';
import style from './style.css';

const DateSelector: FunctionalComponent = () => {
    const date = useStore(selectedDate);

    const selectNextDay = () => {
        setNextDay();
    }
    
    const selectPrevDay = () => {
        setPrevDay();
    }

    return (
        <div class={style.dateSelector}>
            <div class={style.btn} onClick={selectPrevDay}>&laquo;</div>
            {date.toLocaleDateString()}
            <div class={style.btn} onClick={selectNextDay}>&raquo;</div>
        </div>
    );
};

export default DateSelector;
