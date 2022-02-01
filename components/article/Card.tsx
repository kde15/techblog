import React from "react";
import { TagList } from "~/components/article/tag";
import { LoadingLink } from "~/components/utils/LoadingLink";
import type { Tag } from "~/types/api";
import styles from "./Card.module.css";

interface Props {
    title: string;
    link: string;
    tags: Tag[];
    publishedAt: string;
    revisedAt: string;
}

export const Card: React.FC<Props> = ({
    title,
    link,
    tags,
    publishedAt,
    revisedAt,
}) => {
    return (
        <div className={styles.root}>
            <LoadingLink
                href={link}
                className={styles.title}
                text={title}
            ></LoadingLink>
            <div className={styles.tags}>
                <TagList tags={tags} />
            </div>
            <div className={styles.dateContainer}>
                <p>公開 {publishedAt}</p>
                <p className={styles.dateNotFirst}>更新 {revisedAt}</p>
            </div>
        </div>
    );
};
