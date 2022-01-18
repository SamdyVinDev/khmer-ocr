import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    ThemeOptions,
    ThemeProvider,
} from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { FC, useMemo } from "react";
import { useSettings } from "src/contexts/SettingsContext";
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import shape from "./shape";
import typography from "./typography";

const ThemeConfig: FC = ({ children }) => {
    const { themeMode } = useSettings();
    const isLight = themeMode === "light";

    const theme = useMemo(
        () =>
            createTheme({
                palette: isLight
                    ? { ...palette.light, mode: "light" }
                    : { ...palette.dark, mode: "dark" },
                shape,
                typography: typography as TypographyOptions,
                breakpoints,
                shadows: (isLight ? shadows.light : shadows.dark) as any,
                customShadows: isLight
                    ? customShadows.light
                    : customShadows.dark,
            } as ThemeOptions),
        [themeMode],
    );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeConfig;
