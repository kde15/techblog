import { useState } from "react";
import myLayoutEffect from "~/hooks/effect";
import { isBrowser } from "~/lib/utils";

export type Theme = "light" | "dark";

interface ThemeConfig {
    [name: string]: string;
}

// スタイルの定義
const themeConfig = (theme: Theme): ThemeConfig => {
    return {
        "header-background-color": "#171717",
        "header-font-color": theme === "light" ? "#ffffff" : "#ffffff",
        "main-background-color": theme === "light" ? "#dddddd" : "#000000",
        "section-background-color": theme === "light" ? "#ffffff" : "#231f1f",
        "border-color": theme === "light" ? "#ffffff" : "#313335",
        "font-color": theme === "light" ? "#000000" : "#cecdc0",
        "thin-font-color":
            theme === "light"
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.5)",
        "code-span-color": theme === "light" ? "#dddddd" : "#424a52",
        "heading-border-left": "#7db4e6",
        "heading-border-bottom": theme === "light" ? "#000000" : "#30363d",
    } as ThemeConfig;
};

// localStorageから現在のテーマを取得する
const getSavedTheme = (): Theme => {
    if (!isBrowser()) {
        return "light";
    }
    const theme = localStorage.getItem("theme") ?? "";
    if (theme === "light" || theme === "dark") {
        return theme;
    }
    return "light";
};

// localStorageにテーマを保存する
const saveTheme = (value: Theme) => {
    if (!isBrowser()) {
        return;
    }
    if (value === "light" || value === "dark") {
        localStorage.setItem("theme", value);
    }
};

export const useTheme = () => {
    const initialTheme = getSavedTheme();
    const [theme, setTheme] = useState<Theme>(initialTheme);

    // テーマを切り替える関数
    const toggleTheme = () => {
        if (theme === "light") {
            saveTheme("dark");
            setTheme("dark");
        } else {
            saveTheme("light");
            setTheme("light");
        }
    };

    // CSSスタイルを反映する
    const configs = themeConfig(theme);
    myLayoutEffect(() => {
        for (const [key, value] of Object.entries(configs)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
    }, [theme]);

    return {
        theme,
        toggleTheme,
    };
};
