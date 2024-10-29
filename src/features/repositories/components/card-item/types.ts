

export interface RepositoryCardProps {
    name: string;
    description: string | null;
    language: string;
    forks_count: number;
    stargazers_count: number;
    html_url: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    created_at: string;
    onDelete: (id: number) => void;
    onEdit: (id: number, newDescription: string) => void;
    id: number;
}