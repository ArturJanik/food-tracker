import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { resetSidebar, runSidebar, sidebar } from '../../../store/sidebar';
import Button from '../../UI/Button';
import { NewFoodForm } from '../NewFoodForm';
import style from './style.css';

export const NewFoodTile: FunctionalComponent = () => {
    const { type } = useStore(sidebar);
    
    const toggleNewFoodForm = () => {
        if (type === 'INACTIVE') {
            runSidebar(<NewFoodForm />);
        } else {
            resetSidebar();
        }
    }

    return (
        <div class={style.item}>
            <Button classes={style.btn} onClick={toggleNewFoodForm}>Add food</Button>
        </div>
    );
};
