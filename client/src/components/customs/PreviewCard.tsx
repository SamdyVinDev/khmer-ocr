import { varFadeInUp } from "@components/animate";
import CustomModal from "@components/CustomModal";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSettings } from "src/contexts/SettingsContext";
import { fData } from "src/utils/formatNumber";

export default function FileUploadPreviewCard({
    file,
    removeFileHandler,
    url,
}: {
    file: any;
    removeFileHandler: (id: any) => void;
    url: string;
}) {
    const [isPreview, setIsPreview] = useState(false);
    const { t } = useSettings();

    return (
        <Grid
            item
            xs={12}
            md={6}
            lg={4}
            xl={3}
            {...varFadeInUp}
            component={motion.div}
        >
            <Paper elevation={6}>
                <Stack sx={{ p: 2, width: "100%" }}>
                    {file.type.includes("pdf") ? (
                        <Box
                            src={url + "#toolbar=0"}
                            component="iframe"
                            scrolling="no"
                            sx={{
                                width: "100%",
                                height: "300px",
                                border: "none",
                                overflow: "hidden",
                                "& iframe": {
                                    overflow: "hidden",
                                },
                            }}
                        />
                    ) : (
                        <Box
                            src={url}
                            component="img"
                            sx={{
                                width: "100%",
                                height: "300px",
                                objectFit: "contain",
                            }}
                        />
                    )}
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        sx={{ p: 2, width: "100%" }}
                        spacing={2}
                    >
                        <Stack sx={{ width: "100%" }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ width: "100%" }}
                            >
                                <Typography
                                    fontWeight={"bold"}
                                    sx={{
                                        width: "25%",
                                    }}
                                >
                                    {t("NAME")}:
                                </Typography>
                                <Typography
                                    color="GrayText"
                                    noWrap
                                    sx={{
                                        width: "75%",
                                    }}
                                >
                                    {file.name}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    fontWeight={"bold"}
                                    sx={{
                                        width: "25%",
                                    }}
                                >
                                    {t("TYPE")}:
                                </Typography>
                                <Typography
                                    color="GrayText"
                                    sx={{
                                        width: "75%",
                                    }}
                                >
                                    {file.type}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    fontWeight={"bold"}
                                    sx={{
                                        width: "25%",
                                    }}
                                >
                                    {t("SIZE")}:
                                </Typography>
                                <Typography
                                    color="GrayText"
                                    sx={{
                                        width: "75%",
                                    }}
                                >
                                    {fData(file.size)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent={"flex-end"}
                    >
                        <Button
                            color="error"
                            onClick={() => removeFileHandler(file.id)}
                        >
                            {t("REMOVE")}
                        </Button>
                        <Button
                            onClick={() => setIsPreview(true)}
                            variant="outlined"
                        >
                            {t("PREVIEW")}
                        </Button>
                        {/* <Button
                            onClick={convertFileHandler}
                            variant="contained"
                            sx={{ color: "white" }}
                        >
                            {t("CONVERT")}
                        </Button> */}
                    </Stack>
                </Stack>
            </Paper>
            <CustomModal
                title={file && file.name}
                open={isPreview}
                handleClose={() => setIsPreview(false)}
            >
                {file && file.type.includes("pdf") ? (
                    <Box
                        src={url + "#toolbar=0"}
                        component="iframe"
                        sx={{
                            flex: 1,
                            border: "none",
                        }}
                    />
                ) : (
                    <Box
                        src={url}
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                )}
            </CustomModal>
        </Grid>
    );
}
