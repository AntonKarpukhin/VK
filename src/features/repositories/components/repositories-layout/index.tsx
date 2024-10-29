import {memo, ReactNode} from "react";
import styles from './style.module.css';


interface Props {
    children?: ReactNode;
}

const RepositoriesLayout = ({ children }: Props) => {
    return (
        <div className={styles.RepositoriesLayout}>
            {children}
        </div>
    );
}

export default memo(RepositoriesLayout);