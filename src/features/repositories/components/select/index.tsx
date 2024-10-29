import {SelectProps} from "./types.ts";
import {memo} from "react";
import styles from './style.module.css';

const Select = ({options, value, onChange, label, id} : SelectProps) => {
    return (
        <div className={styles.selectContainer}>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="select-element"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default memo(Select);