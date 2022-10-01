import { FunctionalComponent, h } from 'preact';
import style from './style.css';

interface GeneralInputProps<T extends HTMLElement> {
    id: string;
    name: string;
    required?: boolean;
    classes?: string;
    placeholder?: string;
    onInput: (e: h.JSX.TargetedEvent<T, Event>) => void;
    onKeyDown?: (e: h.JSX.TargetedEvent<T, KeyboardEvent>) => void;
}

type InputProps =
    | {
        type: 'text' | 'email' | 'password';
        pattern?: string;
        maxLength?: number;
        minLength?: number;
        value?: string;
    } & GeneralInputProps<HTMLInputElement>
    | {
        type: 'number';
        step?: number;
        max?: number;
        min?: number;
        value?: number;
    } & GeneralInputProps<HTMLInputElement>
    | {
        type: 'date';
        value?: string;
    } & GeneralInputProps<HTMLInputElement>
    | {
        type: 'textarea';
        maxLength?: number;
        minLength?: number;
        value?: string;
    } & GeneralInputProps<HTMLTextAreaElement>;

const Input: FunctionalComponent<InputProps> = (props) => {
    const {
        type,
        classes,
        id,
        name,
        placeholder = 'enter text',
        value,
        required,
    } = props;

    const className = classes ? [style.input, classes].join(' ').trim() : style.input;

    switch (type) {
        case 'number': {
            const { step, max, min, onInput, onKeyDown } = props;
            return (
                <input
                    class={className}
                    type="number"
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    step={step}
                    value={value}
                    max={max}
                    min={min}
                    required={required}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                />
            );
        }
        case 'textarea': {
            const { maxLength, minLength, onInput, onKeyDown } = props;
            return (
                <textarea
                    class={className}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    value={value}
                    maxLength={maxLength}
                    minLength={minLength}
                    required={required}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                />
            );
        }
        case 'text':
        case 'password':
        case 'email': {
            const { pattern, maxLength, minLength, onInput, onKeyDown } = props;
            return (
                <input
                    class={className}
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    pattern={pattern}
                    value={value}
                    maxLength={maxLength}
                    minLength={minLength}
                    required={required}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                />
            );
        }
        case 'date': {
            const { onInput, onKeyDown } = props;
            return (
                <input
                    class={className}
                    type="date"
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    value={value}
                    required={required}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                />
            );
        }
        default:
            return null;
    }
};

export default Input;
