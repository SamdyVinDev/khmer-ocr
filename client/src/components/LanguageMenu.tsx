import { ArrowDropDown } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { languages, useSettings } from "src/contexts/SettingsContext";

export default function LanguageMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { currentLang, onChangeLang } = useSettings();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (lang: any) => {
        if (lang) {
            onChangeLang(lang);
        }
        setAnchorEl(null);
    };
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="Language">
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", cursor: "pointer" }}
                        onClick={handleClick}
                    >
                        <img
                            height={20}
                            width={30}
                            src={currentLang.icon}
                            alt="language"
                            style={{ borderRadius: "5px" }}
                        />
                        <ArrowDropDown sx={{ color: "gray" }} />
                    </Stack>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                onClick={() => handleClose(null)}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {Object.keys(languages).map((langKey: string) => {
                    const { key, icon, label } = languages[langKey];
                    return (
                        <MenuItem onClick={() => handleClose(key)}>
                            <Stack
                                direction="row"
                                sx={{ alignItems: "center" }}
                            >
                                <Box
                                    component="img"
                                    height={20}
                                    width={30}
                                    src={icon}
                                    alt={label}
                                    sx={{ borderRadius: "5px" }}
                                />
                                <Typography sx={{ ml: 1 }}>{label}</Typography>
                            </Stack>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
