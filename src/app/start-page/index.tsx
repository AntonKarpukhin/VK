import {memo} from "react";
import Repositories from "../../features/repositories/pages/repositories";

const StartPage = () => {
    return (
      <Repositories/>
    );
}

export default memo(StartPage);