import {memo, useEffect, useRef} from "react";
import styles from './style.module.css';
import {ICardList} from "./types.ts";

const CardList = ( {list, renderItem, waitMore, loadMore, error}: ICardList ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentScroll = () => {
            if (waitMore || error) return;

            const container = containerRef.current;
            if (container) {
                const { bottom } = container.getBoundingClientRect();
                const { innerHeight } = window;
                if (bottom - 501 <= innerHeight && loadMore) loadMore();
            }
        };

        window.addEventListener('scroll', handleDocumentScroll);
        return () => {
            window.removeEventListener('scroll', handleDocumentScroll);
        };

    }, [waitMore]);


    return (
        <div className={styles.CardList} ref={containerRef}>
            {list.map((comment) => {
                return renderItem(comment);
            })}
        </div>
    )
}

export default memo(CardList)