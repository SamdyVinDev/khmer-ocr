import { NavigateBeforeRounded } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { isString } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useSettings } from "src/contexts/SettingsContext";
import { navItems } from "src/layout/Navbar";
import { s4t } from "src/utils/formatString";
import { MotionInView, varFadeInDown, varFadeInLeft } from "./animate";

export default function ContentTitle({
    title,
    desc,
    icon,
    children,
    headTitle,
    isTool = true,
}: {
    title?: string;
    desc?: string;
    icon?: string | ReactNode;
    children: ReactNode;
    headTitle?: string;
    isTool?: boolean;
}) {
    const { t, currentLang } = useSettings();
    const { pathname, back } = useRouter();
    const selectedTool =
        navItems[navItems.findIndex((x) => `/${x.url}` === pathname)];

    return (
        <Container maxWidth="xl">
            <Head>
                <title>
                    {isTool ? t(s4t(selectedTool.label)) : headTitle || title}
                </title>
                <meta content={desc} />
            </Head>
            {isTool ? (
                <Stack
                    direction="row"
                    sx={{ mt: "-20px", mb: 2 }}
                    component={motion.div}
                    {...varFadeInLeft}
                >
                    <Button
                        onClick={() => back()}
                        variant="contained"
                        startIcon={<NavigateBeforeRounded />}
                    >
                        {t("BACK")}
                    </Button>
                </Stack>
            ) : (
                <Box sx={{ mb: 7 }} />
            )}
            <Stack
                sx={{ justifyContent: "center", alignItems: "center" }}
                spacing={5}
            >
                <MotionInView variants={varFadeInDown}>
                    <Stack
                        sx={{ justifyContent: "center", alignItems: "center" }}
                        spacing={2}
                    >
                        {!isTool ? (
                            <Box
                                component="img"
                                src={icon as string}
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "contain",
                                    alignSelf: "center",
                                }}
                            />
                        ) : (
                            <>
                                <Box sx={{ "& svg": { fontSize: "150px" } }}>
                                    {selectedTool.icon}
                                </Box>
                                <Typography variant="h3">
                                    {t(s4t(selectedTool.label))}
                                </Typography>
                                <Typography variant="caption" color="GrayText">
                                    {selectedTool.desc[currentLang.key]}
                                </Typography>
                            </>
                        )}
                    </Stack>
                </MotionInView>
                {children}
            </Stack>
        </Container>
    );
}
