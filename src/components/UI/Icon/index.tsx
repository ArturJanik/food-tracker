import { FunctionalComponent, h } from 'preact';
import style from './style.css';

type IconType = 'trash-can' | 'pencil' | 'calendar' | 'gears-solid' | 'repeat-solid';

interface IconProps {
    type: IconType;
    alt?: string;
    classes?: string;
}

const Icon: FunctionalComponent<IconProps> = ({ type, alt, classes }) => {
    let className = style.icon;

    if (classes) {
        className = [className, classes].join(' ');
    }

    const imagePath = `/assets/componentIcons/${type}.svg`;
    return (
        <img src={imagePath} alt={alt ? alt : type} class={className} />
    );
}

export default Icon;
