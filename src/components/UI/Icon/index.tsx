import { FunctionalComponent, h } from 'preact';
import style from './style.css';

type IconType = 'trash-can' | 'pencil' | 'calendar' | 'gears-solid' | 'repeat-solid';

interface IconProps {
    type: IconType;
    alt?: string;
    classes?: string;
}

const Icon: FunctionalComponent<IconProps> = ({ type, alt = type, classes }) => {
    let className = style.icon;

    if (classes) {
        className = [className, classes].join(' ').trim();
    }

    const imagePath = `/assets/componentIcons/${type}.svg`;

    return (
        <img src={imagePath} alt={alt} class={className} />
    );
}

export default Icon;
