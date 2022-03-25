import { FunctionalComponent, h } from 'preact';
import FoodList from '../../components/FoodList';
import style from './style.css';

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <FoodList />
        </div>
    );
};

export default Home;
