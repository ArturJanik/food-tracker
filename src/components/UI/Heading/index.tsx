import { ComponentChildren, FunctionalComponent, h } from 'preact';
import style from './style.css';

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
    children: ComponentChildren;
    size?: HeadingSize;
    classes?: string;
}

const Heading: FunctionalComponent<HeadingProps> = ({ children, size, classes }) => {
    switch (size) {
        case 'h6':
            return <h6 class={[style.h6, classes].join(' ')}>{ children }</h6>
        case 'h5':
            return <h5 class={[style.h5, classes].join(' ')}>{ children }</h5>
        case 'h4':
            return <h4 class={[style.h4, classes].join(' ')}>{ children }</h4>
        case 'h3':
            return <h3 class={[style.h3, classes].join(' ')}>{ children }</h3>
        case 'h2':
            return <h2 class={[style.h2, classes].join(' ')}>{ children }</h2>
        case 'h1':
        default:
            return <h1 class={[style.h1, classes].join(' ')}>{ children }</h1>
    }
};

Heading.defaultProps = {
    classes: '',
};

export default Heading;
