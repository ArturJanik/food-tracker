import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h } from 'preact';
import FoodList from '../../components/FoodList';
import Summary from '../../components/Summary';
import { foods } from '../../store/foods';
import style from './style.css';

const Home: FunctionalComponent = () => {
    const data = useStore(foods);

    return (
        <div class={style.home}>
            <Summary />
            <FoodList foods={data} />
        </div>
    );
};

export default Home;
