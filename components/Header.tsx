import { LoadingLink } from "components/utils/LoadingLink";
import React from "react";
import styles from "./Header.module.css";

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
        </header>
    );
};
