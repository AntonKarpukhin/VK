import {memo} from 'react';
import SelectRepositories from "../../containers/select-container";
import RepositoriesLayout from "../../components/repositories-layout";
import CardContainer from "../../containers/card-container";

const Repositories = () => {
    return (
        <RepositoriesLayout>
            <SelectRepositories/>
            <CardContainer/>
        </RepositoriesLayout>
    );
};

export default memo(Repositories);
