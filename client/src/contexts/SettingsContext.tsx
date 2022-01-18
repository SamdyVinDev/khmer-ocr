import _ from "lodash";
import { createContext, FC, useContext, useEffect, useState } from "react";

// Locales =================================
import enLang from "src/locales/en.json";
import khLang from "src/locales/kh.json";
import chLang from "src/locales/ch.json";

const locales = {
    en: enLang,
    kh: khLang,
    ch: chLang,
};

export type LangType = "en" | "kh" | "ch";

export type LangObject = {
    key: LangType;
    icon: string;
    label: string;
};

export const languages: Record<string, LangObject> = {
    en: {
        key: "en",
        icon: "static/flags/en.png",
        label: "English",
    },
    kh: {
        key: "kh",
        icon: "static/flags/kh.png",
        label: "Khmer",
    },
    ch: {
        key: "ch",
        icon: "static/flags/ch.png",
        label: "Chinese",
    },
};

// =========================================

export type InitSettingsContext = {
    toggleThemeMode: () => void;
    themeMode: string;
    t: (text: string) => string;
    currentLang: LangObject;
    onChangeLang: (lang: LangType) => void;
};

export type InitSettings = {
    theme: "light" | "dark";
    lang: LangObject;
};

export const SettingsContext = createContext<InitSettingsContext | null>(null);

export const useSettings = () =>
    useContext(SettingsContext) as InitSettingsContext;

export const SettingsProvider: FC = ({ children }) => {
    const initSettings: InitSettings = {
        theme: "light",
        lang: languages.en,
    };

    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState(initSettings);

    const toggleThemeMode = () => {
        const updatedSettings: InitSettings = {
            ...settings,
            theme: settings.theme === "light" ? "dark" : "light",
        };
        setSettings(updatedSettings);
        localStorage.setItem("settings", JSON.stringify(updatedSettings));
    };

    const t = (text: string) => {
        const translate = _.get(locales[settings.lang.key], text, text);

        return translate;
    };

    const onChangeLang = (lang: LangType) => {
        const updatedSettings: InitSettings = {
            ...settings,
            lang: languages[lang],
        };
        setSettings(updatedSettings);
        localStorage.setItem("settings", JSON.stringify(updatedSettings));
    };

    const initSettingsContext: InitSettingsContext = {
        toggleThemeMode,
        themeMode: settings.theme,
        t,
        currentLang: settings.lang,
        onChangeLang,
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storageSettings = localStorage.getItem("settings");

            if (!storageSettings) {
                localStorage.setItem("settings", JSON.stringify(initSettings));
            } else {
                const parsedSettings = JSON.parse(storageSettings);
                setSettings(parsedSettings);
            }
            setLoading(false);
        }
    }, []);

    return (
        <SettingsContext.Provider value={initSettingsContext}>
            {children}
        </SettingsContext.Provider>
    );
};
