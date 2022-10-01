import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const Spinner: FunctionalComponent = () => <div class={style.spinner} role="progressbar" />;

export default Spinner;
