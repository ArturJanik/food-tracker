import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

interface LabelProps {
    children: ComponentChildren;
    classes?: string;
    forInputId?: string;
}

const Label: FunctionalComponent<LabelProps> = ({ children, classes, forInputId }) => {
    const className = classes ? [style.label, classes].join(' ') : style.label;

    return (
        <label for={forInputId} class={className}>{children}</label>
    );
};

export default Label;
