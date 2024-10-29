import styles from './style.module.css';
import {memo, ReactNode} from "react";

interface Props {
    children?: ReactNode;
}

const SelectLayout = ({children}: Props) => {
    return (
        <div className={styles.SelectLayout}>
            {children}
        </div>
    )
}

export default memo(SelectLayout);