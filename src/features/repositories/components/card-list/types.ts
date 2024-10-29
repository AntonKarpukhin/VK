import {Repository} from "../../store/types.ts";
import {ReactNode} from "react";

export interface ICardList {
    list: Repository[];
    renderItem: (item: Repository) => ReactNode;
    loadMore?: () => void;
    waitMore?: boolean;
    error: string;
}