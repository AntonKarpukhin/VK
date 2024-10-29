import {memo} from "react";
import spinnerGif from '../../../assets/icons/spin.gif';
import styles from './style.module.css';

const Spinner = () => {
    return (
        <div className={styles.Spinner}>
            <img className={styles.SpinnerImg} src={spinnerGif} alt="Loading..."/>
        </div>
    );
}

export default memo(Spinner);