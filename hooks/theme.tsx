import myLayoutEffect from "~/hooks/effect";

export type Theme = "light" | "dark";

interface ThemeConfig {
    [name: string]: string;
}

const themeConfig = (theme: Theme): ThemeConfig => {
    return {
        "background-color": theme === "light" ? "#ffffff" : "#000000",
    } as ThemeConfig;
};

export const useTheme = (theme: Theme) => {
    const configs = themeConfig(theme);
    myLayoutEffect(() => {
        for (const [key, value] of Object.entries(configs)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
    }, [theme]);
};
