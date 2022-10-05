import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

interface ButtonProps {
    children: ComponentChildren;
    classes?: string;
    title?: string;
    onClick: () => void;
}

const Button: FunctionalComponent<ButtonProps> = ({
    children,
    classes = [],
    title,
    onClick,
}) => {
    const className = style.button;

    const defaultProps = {
        class: [className, classes].join(' ').trim(),
        title,
        role: 'button',
        tabIndex: 0,
    };

    return (
        <div {...defaultProps} onClick={onClick}>
            {children}
        </div>
    );
};

export default Button;
