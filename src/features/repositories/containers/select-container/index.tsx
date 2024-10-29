import SelectLayout from "../../components/select-layout";
import Select from "../../components/select";
import {languageOptions, sortOptions} from "../../mocks/select.ts";
import {memo, useCallback} from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../../services/store/root-store-context.ts";


const SelectRepositories = observer(() => {
    const { repositories: { setSort, setLanguage, sortField, sortOrder, language } } = useStores();

    const handleSortChange = useCallback((value: string) => {
        const [field, order] = value.split('-');
        setSort(field, order);
    }, [setSort]);

    const handleLanguageChange = useCallback((value: string) => {
        setLanguage(value);
    }, [setLanguage]);

    return (
        <SelectLayout>
            <Select
                id="sort"
                label="Сортировать по:"
                options={sortOptions}
                value={`${sortField}-${sortOrder}`}
                onChange={handleSortChange}
            />

            <Select
                id="language"
                label="Фильтр по языку:"
                options={languageOptions}
                value={language}
                onChange={handleLanguageChange}
            />
        </SelectLayout>
    );
});

export default memo(SelectRepositories);