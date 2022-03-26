import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { resetSidebar, runSidebar, sidebar } from '../../store/sidebar';
import Settings from '../Settings';
import Button from '../UI/Button';
import Icon from '../UI/Icon';
import style from './style.css';

const Header: FunctionalComponent = () => {
    const { type } = useStore(sidebar);
    
    const toggleSettings = () => {
        if (type === 'INACTIVE') {
            runSidebar(<Settings />);
        } else {
            resetSidebar();
        }
    }

    return (
        <header class={style.header}>
            <h1>LazyFoodnote</h1>
            <Button onClick={toggleSettings}><Icon type="gears-solid" classes={style.icon} /></Button>
        </header>
    );
};

export default Header;
