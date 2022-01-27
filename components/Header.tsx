import React from "react";
import styles from "styles/Header.module.css";
import { LoadingLink } from "components/utils/LoadingLink";

export const Header = () => {
    return (
        <header>
            <div className={styles.title}>
                <LoadingLink
                    href="/"
                    className={styles.titleLink}
                    text="日々の技術学習録"
                />
            </div>
            <p className={styles.navLink}>
                <LoadingLink href="/" className={styles.link} text="記事一覧" />
            </p>
            <p className={styles.navLink}>
                <LoadingLink href="/" className={styles.link} text="タグ一覧" />
            </p>
        </header>
    );
};
