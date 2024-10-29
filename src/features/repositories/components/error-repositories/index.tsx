import {memo} from "react";
import {IErrorRepositories} from "./types.ts";


const ErrorRepositories = ({onSubmitData} : IErrorRepositories) => {
    return (
        <div>
            <h2>Не удалось загрузить данные!</h2>
            <button onClick={onSubmitData}>Перезагрузить</button>
        </div>
    );
};

export default memo(ErrorRepositories);