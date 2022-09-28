import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

type ButtonType = 'PRIMARY' | 'SECONDARY' | 'LINK';

interface ButtonProps {
    children: ComponentChildren;
    onClick?: () => void;
    classes?: string;
    type?: ButtonType;
    title?: string;
}

const Button: FunctionalComponent<ButtonProps> = ({ children, classes, type, title, onClick }) => {
    let className = style.button;

    if (type === 'SECONDARY') {
        className = style.secondaryButton;
    }

    if (type === 'LINK') {
        className = style.linkButton;
    }

    if (classes) {
        className = [className, classes].join(' ');
    }

    if (!onClick) {
        return <div class={className} title={title}>{children}</div>
    }

    return (
        <div class={className} onClick={onClick} title={title}>
            {children}
        </div>
    );
};

Button.defaultProps = {
    children: 'Submit',
};

export default Button;
