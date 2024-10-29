import { makeAutoObservable, runInAction } from "mobx";
import { Repository } from "./types.ts";

class RepositoriesStore {
    items: Repository[] = [];
    page = 1;
    nextPage = 2;
    isLoading = false;
    hasMore = true;
    language = 'javascript';
    error = '';
    waitMore = false;
    waitMoreError = '';
    sortField: string = 'stars';
    sortOrder: string = 'desc';

    url = 'https://api.github.com/search/repositories?';

    constructor() {
        makeAutoObservable(this);
    }

    private async _fetchData(page: number, append = false) {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {};

        try {
            const response = await fetch(
                `${this.url}q=${this.language}&sort=${this.sortField}&order=${this.sortOrder}&page=${page}`,
                { headers }
            );
            const data = await response.json();

            runInAction(() => {
                if (data.items.length > 0) {
                    this.items = append ? [...this.items, ...data.items] : data.items;
                    this.hasMore = true;
                    this.page = append ? this.page : 1;
                    this.nextPage = append ? this.nextPage + 1 : 2;
                } else {
                    this.hasMore = false;
                }
            });
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            runInAction(() => {
                if (append) {
                    this.waitMoreError = 'Ошибка загрузки данных';
                } else {
                    this.error = 'Ошибка загрузки данных';
                }
            });
        } finally {
            runInAction(() => {
                if (append) {
                    this.waitMore = false;
                } else {
                    this.isLoading = false;
                }
            });
        }
    }

    loadData = async () => {
        if (this.isLoading || !this.hasMore) return;

        this.error = '';
        this.isLoading = true;
        await this._fetchData(this.page);
    };

    loadMoreData = async () => {
        if (this.waitMore || !this.hasMore) return;

        this.waitMoreError = '';
        this.waitMore = true;
        await this._fetchData(this.nextPage, true);
    };

    setSort = (field: string, order: string) => {
        this.sortField = field;
        this.sortOrder = order;
        this.page = 1;
        this.items = [];
        this.loadData();
    };

    setLanguage = (language: string) => {
        this.language = language;
        this.page = 1;
        this.items = [];
        this.loadData();
    };

    removeRepository = (id: number) => {
        runInAction(() => {
            this.items = this.items.filter(repo => repo.id !== id);
        });
    };

    editRepository = (id: number, newDescription: string) => {
        runInAction(() => {
            const updatedItems = this.items.map(repo =>
                repo.id === id ? { ...repo, description: newDescription } : repo
            );
            this.items = updatedItems;
        });
    };
}

export const repositoriesStore = new RepositoriesStore();