import { useState } from "react";
import myLayoutEffect from "~/hooks/effect";

export type Theme = "light" | "dark";

interface ThemeConfig {
    [name: string]: string;
}

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

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const configs = themeConfig(theme);
    myLayoutEffect(() => {
        for (const [key, value] of Object.entries(configs)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
    }, [theme]);
    return {
        theme,
        setTheme,
    };
};
