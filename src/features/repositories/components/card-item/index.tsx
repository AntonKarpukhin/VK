import React, {memo, useState, useEffect, useCallback} from 'react';
import { RepositoryCardProps } from "./types.ts";
import styles from './style.module.css';

const RepositoryCard: React.FC<RepositoryCardProps> = ({
                                                           name,
                                                           description,
                                                           language,
                                                           forks_count,
                                                           stargazers_count,
                                                           html_url,
                                                           owner,
                                                           created_at,
                                                           id,
                                                           onDelete,
                                                           onEdit
                                                       }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(description || '');

    useEffect(() => {
        setNewDescription(description || '');
    }, [description]);

    const handleEditToggle = useCallback(() => {
        setIsEditing((prev) => !prev);
    }, []);

    const handleSave = useCallback(() => {
        onEdit(id, newDescription);
        setIsEditing(false);
    }, [onEdit, id, newDescription]);

    const handleCancel = useCallback(() => {
        setNewDescription(description || '');
        setIsEditing(false);
    }, [description]);

    return (
        <div className={styles.repositoryCard}>
            <div className={styles.repositoryHeader}>
                <img src={owner.avatar_url} alt={owner.login} className={styles.ownerAvatar} />
                <a href={html_url} target="_blank" rel="noopener noreferrer" className={styles.repositoryName}>
                    {name}
                </a>
                <div className={styles.box}></div>
                <button onClick={() => onDelete(id)} className={styles.deleteButton} title="Delete">
                    🗑️
                </button>
            </div>
            {isEditing ? (
                <div className={styles.editDescription}>
                    <textarea
                        value={newDescription || ''}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className={styles.descriptionInput}
                    />
                    <div className={styles.wrapperEditDescription}>
                        <button onClick={handleSave} className={styles.saveButton}>Save</button>
                        <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    </div>
                </div>
            ) : (
                <p className={styles.repositoryDescription}>{description || 'No description provided.'}</p>
            )}
            <div className={styles.repositoryDetails}>
                <span className={styles.language}>{language}</span>
                <span className={styles.forks}>🍴 {forks_count}</span>
                <span className={styles.stars}>⭐ {stargazers_count}</span>
            </div>
            <div className={styles.repositoryFooter}>
                <span>Created: {new Date(created_at).toLocaleDateString()}</span>
                {!isEditing && (
                    <button onClick={handleEditToggle} className={styles.editButton} title="Edit">
                        ✏️
                    </button>
                )}
            </div>
        </div>
    );
};

export default memo(RepositoryCard);
