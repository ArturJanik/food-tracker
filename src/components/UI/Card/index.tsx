import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

interface CardProps {
    children: ComponentChildren;
    classes?: string;
}

const Card: FunctionalComponent<CardProps> = ({ children, classes }) => {
    const className = classes ? [style.card, classes].join(' ').trim() : style.card;

    return (
        <div class={className}>{children}</div>
    );
};

export default Card;
