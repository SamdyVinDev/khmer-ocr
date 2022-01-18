import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useSettings } from "src/contexts/SettingsContext";

export default function ThemeModeMenu() {
    const { themeMode, toggleThemeMode } = useSettings();

    return (
        <Tooltip title={themeMode === "light" ? "Dark Mode" : "Light Mode"}>
            <IconButton onClick={toggleThemeMode}>
                {themeMode === "light" ? (
                    <DarkModeRounded />
                ) : (
                    <LightModeRounded />
                )}
            </IconButton>
        </Tooltip>
    );
}
