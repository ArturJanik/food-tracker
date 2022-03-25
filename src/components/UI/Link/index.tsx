import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

interface LinkProps {
    children: ComponentChildren;
    path: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    classes?: string;
    title?: string;
}

const Link: FunctionalComponent<LinkProps> = ({ children, path, classes, target, title }) => {
    const className = classes ? [style.link, classes].join(' ') : style.link;

    return (
        <a href={path} target={target} title={title ? title : path} class={className}>{children}</a>
    );
}

export default Link;
