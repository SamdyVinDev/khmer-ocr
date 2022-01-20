import { MotionInView, varFadeInRight, varFadeInUp } from "@components/animate";
import ContentTitle from "@components/ContentTitle";
import { Search } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
    Icon,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useMemo, useState } from "react";
import { useSettings } from "src/contexts/SettingsContext";
import { navItems } from "src/layout/Navbar";

const Home = () => {
    const router = useRouter();
    const [selectedPdfTool, setSelectedPdfTool] = useState<any>();
    const { t, currentLang } = useSettings();

    const onSearch = (e: any) => {
        e.preventDefault();
        if (selectedPdfTool) {
            console.log("selectedPdfTool:", selectedPdfTool);
            router.push(selectedPdfTool.url);
        }
    };

    const MenuItem = ({
        label,
        desc,
        url,
        logo,
        icon,
        disabled,
    }: {
        label: string;
        desc: string;
        url: string;
        logo: string;
        icon: ReactNode;
        disabled: boolean;
    }) => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <MotionInView variants={varFadeInUp}>
                    {disabled ? (
                        <Paper
                            elevation={6}
                            sx={{
                                border: "2px solid",
                                height: "130px",
                                borderColor: "background.paper",
                                transition: "all 300ms ease-in-out",
                                filter: "grayscale(1)",
                                pointerEvents: "none",
                            }}
                        >
                            <Grid
                                container
                                padding={2}
                                spacing={2}
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                wrap="wrap"
                                direction={"row"}
                                sx={{ height: "100%" }}
                            >
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                        fontSize: "70px",
                                    }}
                                >
                                    {icon}
                                </Grid>
                                <Grid item xs={10} sx={{ height: "100%" }}>
                                    <Stack
                                        sx={{
                                            flex: 1,
                                            justifyContent: "flex-start",
                                            alignItems: "flex-start",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <Typography variant="subtitle1">
                                            {label}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="GrayText"
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {desc}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    ) : (
                        <Link href={url}>
                            <a
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <Paper
                                    elevation={6}
                                    sx={{
                                        border: "2px solid",
                                        height: "130px",
                                        borderColor: "background.paper",
                                        transition: "all 300ms ease-in-out",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Grid
                                        container
                                        padding={2}
                                        spacing={2}
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        wrap="wrap"
                                        direction={"row"}
                                        sx={{ height: "100%" }}
                                    >
                                        <Grid
                                            item
                                            xs={2}
                                            sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                display: "flex",
                                                fontSize: "70px",
                                            }}
                                        >
                                            {icon}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={10}
                                            sx={{ height: "100%" }}
                                        >
                                            <Stack
                                                sx={{
                                                    flex: 1,
                                                    justifyContent:
                                                        "flex-start",
                                                    alignItems: "flex-start",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                <Typography variant="subtitle1">
                                                    {label}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="GrayText"
                                                    style={{
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient:
                                                            "vertical",
                                                    }}
                                                >
                                                    {desc}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </a>
                        </Link>
                    )}
                </MotionInView>
            </Grid>
        );
    };

    return (
        <ContentTitle
            isTool={false}
            icon={"favicon/logo.png"}
            headTitle="Khmer OCR"
        >
            <Container maxWidth="md">
                <MotionInView variants={varFadeInRight}>
                    <Typography
                        color="GrayText"
                        sx={{ textAlign: "center", fontSize: "12px" }}
                    >
                        “Khmer OCR” is an Artificial Intelligence (AI) project
                        using Deep Learning together with Computer Vision where
                        we mainly focus on Khmer text recognition system joint
                        by Text line Detection model and Text Recognition model.
                    </Typography>
                </MotionInView>
            </Container>
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                >
                    {navItems.map((item) =>
                        MenuItem({
                            ...item,
                            label: t(item.label),
                            desc: item.desc[currentLang.key],
                        }),
                    )}
                </Grid>
            </Container>
        </ContentTitle>
    );
};

export default Home;
