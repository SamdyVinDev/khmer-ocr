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
    }: {
        label: string;
        desc: string;
        url: string;
        logo: string;
        icon: ReactNode;
    }) => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <MotionInView variants={varFadeInUp}>
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
                        </a>
                    </Link>
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
            <Container maxWidth="sm">
                <MotionInView variants={varFadeInRight}>
                    <form onSubmit={onSearch}>
                        <Stack direction={"row"} spacing={1}>
                            <Autocomplete
                                fullWidth
                                id="search-for-pdf-tool"
                                value={selectedPdfTool}
                                onChange={(e: any, newValue: any) =>
                                    setSelectedPdfTool(newValue)
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.url === value
                                }
                                disableClearable
                                options={navItems}
                                getOptionLabel={(option: any) =>
                                    t(option.label)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t("SEARCH_FOR_PDF_TOOLS")}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: "search",
                                        }}
                                    />
                                )}
                            />
                            <Button variant="contained" type="submit">
                                <Search />
                            </Button>
                        </Stack>
                    </form>
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
