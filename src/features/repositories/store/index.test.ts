import { Repository } from "./types";
import {repositoriesStore} from "./index.ts";

const createTestRepository = (overrides?: Partial<Repository>): Repository => ({
    id: 1,
    node_id: "test-node",
    name: "TestRepo",
    full_name: "user/TestRepo",
    private: false,
    owner: { login: "user", avatar_url: "" },
    html_url: "",
    description: "Test",
    fork: false,
    url: "",
    forks_url: "",
    keys_url: "",
    collaborators_url: "",
    teams_url: "",
    hooks_url: "",
    issue_events_url: "",
    events_url: "",
    assignees_url: "",
    branches_url: "",
    tags_url: "",
    blobs_url: "",
    git_tags_url: "",
    git_refs_url: "",
    trees_url: "",
    statuses_url: "",
    languages_url: "",
    stargazers_url: "",
    contributors_url: "",
    subscribers_url: "",
    subscription_url: "",
    commits_url: "",
    git_commits_url: "",
    comments_url: "",
    issue_comment_url: "",
    contents_url: "",
    compare_url: "",
    merges_url: "",
    archive_url: "",
    downloads_url: "",
    issues_url: "",
    pulls_url: "",
    milestones_url: "",
    notifications_url: "",
    labels_url: "",
    releases_url: "",
    deployments_url: "",
    created_at: "",
    updated_at: "",
    pushed_at: "",
    git_url: "",
    ssh_url: "",
    clone_url: "",
    svn_url: "",
    homepage: null,
    size: 0,
    stargazers_count: 0,
    watchers_count: 0,
    language: "JavaScript",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "public",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "main",
    score: 0,
    ...overrides,
});

describe("RepositoriesStore", () => {
    beforeEach(() => {
        // Сброс перед каждым тестом
        repositoriesStore.items = [];
        repositoriesStore.page = 1;
        repositoriesStore.nextPage = 2;
        repositoriesStore.isLoading = false;
        repositoriesStore.hasMore = true;
        repositoriesStore.error = '';
        repositoriesStore.waitMoreError = '';
        repositoriesStore.sortField = 'stars';
        repositoriesStore.sortOrder = 'desc';
    });

    test("loadData sets items and nextPage", async () => {
        await repositoriesStore.loadData();
        expect(repositoriesStore.items.length).toBeGreaterThan(0);
        expect(repositoriesStore.nextPage).toBe(2);
    });

    test("setSort changes sort parameters and reloads data", () => {
        repositoriesStore.setSort("forks", "asc");
        expect(repositoriesStore.sortField).toBe("forks");
        expect(repositoriesStore.sortOrder).toBe("asc");
        expect(repositoriesStore.page).toBe(1);
    });

    test("removeRepository removes repository from items", () => {
        const repo = createTestRepository({ id: 1 });
        repositoriesStore.items = [repo];
        repositoriesStore.removeRepository(1);
        expect(repositoriesStore.items).toHaveLength(0);
    });

    test("editRepository updates repository description", () => {
        const repo = createTestRepository({ id: 1 });
        repositoriesStore.items = [repo];
        repositoriesStore.editRepository(1, "New Description");
        expect(repositoriesStore.items[0].description).toBe("New Description");
    });
});
