import { FunctionalComponent, h } from 'preact';
import Input from '../../UI/Input';
import style from './style.css';

interface NameFilterProps {
    onInput: (value: string) => void;
    searchQuery: string;
}

export const NameFilter: FunctionalComponent<NameFilterProps> = ({
    onInput,
    searchQuery,
}) => {
    return (
        <div class={style.wrapper}>
            <p>Filter by name:</p>
            <Input
                type="text"
                id="nameQuery"
                name="nameQuery"
                classes={style.input}
                onInput={(e) => onInput(e.currentTarget.value)}
                placeholder="enter food name"
                value={searchQuery}
            />
        </div>
    );
};
