import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { LoadingLink } from "~/components/utils/LoadingLink";
import type { Theme } from "~/hooks/theme";
import styles from "./Header.module.css";

export const Header: React.FC<{
    theme: Theme;
    toggleTheme: () => void;
}> = ({ theme, toggleTheme }) => {
    return (
        <header>
            <div className={styles.title}>
                <LoadingLink
                    href="/"
                    className={styles.titleLink}
                    text="日々の技術学習録"
                />
            </div>
            <p className={styles.articlesLink}>
                <LoadingLink href="/" className={styles.link} text="記事一覧" />
            </p>
            <button className={styles.iconButton} onClick={toggleTheme}>
                {theme === "light" ? (
                    <MoonIcon color="#ffffff" width="60%" height="60%" />
                ) : (
                    <SunIcon color="#ffffff" width="60%" height="60%" />
                )}
            </button>
        </header>
    );
};
