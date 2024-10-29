import {memo, useEffect} from "react";
import ErrorRepositories from "../../components/error-repositories";
import Spinner from "../../../../ui/elements/spinner";
import CardList from "../../components/card-list";
import {Repository} from "../../store/types.ts";
import RepositoryCard from "../../components/card-item";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../../services/store/root-store-context.ts";

const CardContainer = observer(() => {
    const { repositories: { loadData,
        loadMoreData,
        isLoading,
        items,
        waitMore,
        error,
        waitMoreError,
        removeRepository,
        editRepository, } } = useStores();

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!isLoading && items.length < 13 && items.length !== 0) {
            loadMoreData();
        }
    }, [items.length, isLoading]);

    return (
        <>
            {error && <ErrorRepositories onSubmitData={loadData} />}
            {isLoading ? (
                <Spinner />
            ) : (
                <CardList
                    list={items}
                    renderItem={(repo: Repository) => (
                        <RepositoryCard
                            key={repo.id}
                            name={repo.name}
                            description={repo.description}
                            language={repo.language}
                            forks_count={repo.forks_count}
                            stargazers_count={repo.stargazers_count}
                            html_url={repo.html_url}
                            owner={repo.owner}
                            created_at={repo.created_at}
                            onDelete={(id) => removeRepository(id)}
                            id={repo.id}
                            onEdit={(id, newDescription) => editRepository(id, newDescription)}
                        />
                    )}
                    loadMore={loadMoreData}
                    waitMore={waitMore}
                    error={waitMoreError}
                />
            )}
            {waitMore && <Spinner />}
            {waitMoreError && <ErrorRepositories onSubmitData={loadMoreData} />}
        </>
    );
});

export default memo(CardContainer);