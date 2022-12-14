import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

interface SectionProps {
    children: ComponentChildren;
    backgroundColor?: string;
    classes?: string;
}

const Section: FunctionalComponent<SectionProps> = ({
    children,
    backgroundColor = '#fff',
    classes,
}) => {
    const className = classes ? [style.section, classes].join(' ').trim() : style.section;

    return (
        <section class={className} style={{ background: backgroundColor }}>
            {children}
        </section>
    );
};

export default Section;
