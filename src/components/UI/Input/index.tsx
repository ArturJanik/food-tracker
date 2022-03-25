import { FunctionalComponent, h } from 'preact';
import style from './style.css';

interface GeneralInputProps<T extends HTMLElement> {
    id: string;
    name: string;
    required?: boolean;
    classes?: string;
    placeholder?: string;
    onInput: (e: h.JSX.TargetedEvent<T, Event>) => void;
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
    const { type, classes, id, name, placeholder, value, required } = props;
    const className = classes ? [style.input, classes].join(' ') : style.input;

    switch (type) {
        case 'number': {
            const { step, max, min, onInput } = props;
            return (
                <input
                    class={className}
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    step={step}
                    value={value}
                    max={max}
                    min={min}
                    required={required}
                    onInput={onInput}
                />
            );
        }
        case 'textarea': {
            const { maxLength, minLength, onInput } = props;
            return (
                <textarea
                    class={className}
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    value={value}
                    maxLength={maxLength}
                    minLength={minLength}
                    required={required}
                    onInput={onInput}
                />
            );
        }
        case 'text':
        case 'password':
        case 'email': {
            const { pattern, maxLength, minLength, onInput } = props;
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
                />
            );
        }
        case 'date': {
            const { onInput } = props;
            return (
                <input
                    class={className}
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    value={value}
                    required={required}
                    onInput={onInput}
                />
            );
        }
        default:
            return null;
    }
};

Input.defaultProps = {
    placeholder: 'enter text',
};

export default Input;
