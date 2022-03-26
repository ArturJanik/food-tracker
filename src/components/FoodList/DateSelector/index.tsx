import { FunctionalComponent, h } from 'preact';
import style from './style.css';

interface DateSelectorProps {
    selected: Date;
    onSelect: (date: Date) => void;
}

const DateSelector: FunctionalComponent<DateSelectorProps> = ({ selected, onSelect }) => {
    const selectNextDay = () => {
        const nextDay = selected.setDate(selected.getDate() + 1);
        onSelect(new Date(nextDay));
    }
    
    const selectPrevDay = () => {
        const prevDay = selected.setDate(selected.getDate() - 1);
        onSelect(new Date(prevDay));
    }

    return (
        <div class={style.dateSelector}>
            <div class={style.btn} onClick={selectPrevDay}>&laquo;</div>
            {selected.toLocaleDateString()}
            <div class={style.btn} onClick={selectNextDay}>&raquo;</div>
        </div>
    );
};

export default DateSelector;
