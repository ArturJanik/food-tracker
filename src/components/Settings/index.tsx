import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { kcalGoal, protGoal, setKcalGoal, setProtGoal } from '../../store/settings';
import Input from '../UI/Input';
import Label from '../UI/Label';
import style from './style.css';

const Settings: FunctionalComponent = () => {
    const kcal = useStore(kcalGoal);
    const prot = useStore(protGoal);

    return (
        <>
            <div class={style.title}>Settings</div>
            <Label forInputId='kcalInput'>Daily kcal goal</Label>
            <Input
                type='number'
                id='kcalInput'
                name='kcalInput'
                onInput={(e) => setKcalGoal({ goal: parseInt(e.currentTarget.value) })}
                placeholder='Set daily kcal goal'
                value={kcal}
            />
            <Label forInputId='protInput'>Daily prot goal</Label>
            <Input
                type='number'
                id='protInput'
                name='protInput'
                onInput={(e) => setProtGoal({ goal: parseInt(e.currentTarget.value) })}
                placeholder='Set daily prot goal'
                value={prot}
            />
        </>
    );
};

export default Settings;
