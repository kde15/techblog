import React from "react";
import { LoadingLink } from "components/utils/LoadingLink";
import styles from "./Card.module.css";
import { TagList } from "components/utils/tag";
import type { Tag } from "types/api";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

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
        <div
            className={styles.root}
            onClick={() => {
                nprogress.start();
            }}
        >
            <LoadingLink href={link} className={styles.cardLink} text="">
                <p className={styles.title}>{title}</p>
                <div className={styles.tags}>
                    <TagList tags={tags} />
                </div>
                <div className={styles.dateContainer}>
                    <p>公開 {publishedAt}</p>
                    <p className={styles.dateNotFirst}>更新 {revisedAt}</p>
                </div>
            </LoadingLink>
        </div>
    );
};
