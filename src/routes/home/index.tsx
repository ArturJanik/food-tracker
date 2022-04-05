import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import FoodList from '../../components/FoodList';
import Summary from '../../components/Summary';
import Spinner from '../../components/UI/Spinner';
import { foodnotesLoading, getFoodnotes } from '../../store/foodnotes';
import { foods, foodsLoading, getFoods } from '../../store/foods';
import style from './style.css';

const Home: FunctionalComponent = () => {
    const data = useStore(foods);
    const loading = useStore(foodsLoading);
    const notesLoading = useStore(foodnotesLoading);

    useEffect(() => {
        getFoods();
    }, []);

    useEffect(() => {
        getFoodnotes();
    }, [data]);

    return (
        <div class={style.home}>
            { !notesLoading && <Summary /> }
            { loading && <Spinner /> }
            { !loading && <FoodList foods={data} /> }
        </div>
    );
};

export default Home;
