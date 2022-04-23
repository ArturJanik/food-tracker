import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import FoodList from '../../components/FoodList';
import Summary from '../../components/Summary';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Spinner from '../../components/UI/Spinner';
import { foodnotesLoading, getFoodnotes } from '../../store/foodnotes';
import { foods, foodsLoading, getFoods } from '../../store/foods';
import style from './style.css';

const REQUIRED_PIN = '0700';

const Home: FunctionalComponent = () => {
    const data = useStore(foods);
    const loading = useStore(foodsLoading);
    const notesLoading = useStore(foodnotesLoading);
    const [authorized, setAuthorized] = useState(false);
    const [pin, setPin] = useState('');

    useEffect(() => {
        if (authorized) {
            getFoods();
        }
    }, [authorized]);

    useEffect(() => {
        getFoodnotes();
    }, [data]);

    const validate = () => {
        if (pin === REQUIRED_PIN) {
            setAuthorized(true);
        }
    }

    if (!authorized) {
        return (
            <div class={style.home}>
                <Input
                    type='text'
                    id='pin'
                    name='pin' 
                    onInput={(e) => setPin(e.currentTarget.value)}
                    placeholder='Enter pin'
                    value={pin}
                />
                <Button classes={style.btn} onClick={validate}>Submit</Button>
            </div>
        );
    }

    return (
        <div class={style.home}>
            { !notesLoading && <Summary /> }
            { loading && <Spinner /> }
            { !loading && <FoodList foods={data} /> }
        </div>
    );
};

export default Home;
