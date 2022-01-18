import {
    varBounceInDown,
    varFadeInDown,
    varFadeInUp,
} from "@components/animate";
import ContentTitle from "@components/ContentTitle";
import FileUploadPreviewCard from "@components/customs/PreviewCard";
import UploadMultipleFiles from "@components/UploadMultipleFiles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSettings } from "src/contexts/SettingsContext";
import { v4 as uuid } from "uuid";

export default function splitPdf() {
    const { t } = useSettings();
    const [files, setFiles] = useState<any[]>([]);
    const [uploadProgress, setUploadProgress] = useState<any>(0);
    const [uploadStarted, setUploadStarted] = useState(false);
    const [uploadCompleted, setUploadCompleted] = useState(false);

    useEffect(() => {
        if (uploadProgress >= 100) {
            const notifySound = new Audio("sounds/notify.mp3");
            notifySound.play();
            toast.success(t("CONVERTED_SUCCESSFULLY"));
            setFiles([]);
            setUploadCompleted(true);
            setUploadStarted(false);
        }
    }, [uploadProgress]);

    const convertFilesHandler = () => {
        console.log("Start Converting...");
        setUploadStarted(true);
        Array.from(Array(100)).forEach((_, i) => {
            setTimeout(() => setUploadProgress(i + 1), i * 100);
        });
    };

    const removeFileHandler = (id: any) => {
        setFiles(files?.filter((x) => x.id !== id));
    };

    const Progressbar = () => {
        return (
            <>
                <Box sx={{ width: "100%", height: "100px" }}>
                    <Typography color="primary" variant="h1" align="center">
                        {uploadProgress}%
                    </Typography>
                </Box>
                <Box sx={{ height: "20px" }} />
                <Box
                    sx={{
                        width: "100%",
                        height: "10px",
                        backgroundColor: "primary.lighter",
                        borderRadius: 1,
                    }}
                >
                    <Box
                        sx={{
                            height: "10px",
                            width: `${uploadProgress}%`,
                            backgroundColor: "primary.main",
                            borderRadius: 1,
                        }}
                    />
                    <Box
                        sx={{
                            height: "10px",
                            width: `${uploadProgress}%`,
                            position: "relative",
                        }}
                    >
                        <Box
                            src="static/turtle.gif"
                            component="img"
                            sx={{
                                height: "80px",
                                width: "80px",
                                position: "absolute",
                                top: -75,
                                right: -25,
                                // transform: "scaleX(-1)",
                            }}
                        />
                    </Box>
                </Box>
                <Typography
                    color="primary"
                    variant="h5"
                    align="center"
                    sx={{ mt: 10 }}
                >
                    {t("CONVERTING")}...
                </Typography>
            </>
        );
    };

    return (
        <ContentTitle>
            <AnimatePresence>
                {uploadCompleted ? (
                    <Stack
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={3}
                    >
                        <Box {...varBounceInDown} component={motion.div}>
                            <CheckCircleIcon
                                sx={{ fontSize: "150px", color: "green" }}
                            />
                        </Box>
                        <Button
                            onClick={() => setUploadCompleted(false)}
                            variant="contained"
                            size="large"
                        >
                            {t("CONVERT_OTHER_FILES")}
                        </Button>
                    </Stack>
                ) : (
                    <>
                        {uploadStarted ? (
                            <Progressbar />
                        ) : (
                            <>
                                <Box
                                    sx={{ width: "100%" }}
                                    component={motion.div}
                                    {...varFadeInDown}
                                >
                                    <UploadMultipleFiles
                                        files={files}
                                        accept={[
                                            "application/pdf",
                                            "image/png",
                                            "image/jpeg",
                                            "image/jpg",
                                        ]}
                                        onDropAccepted={(
                                            acceptedFiles: any,
                                            event: any,
                                        ) => {
                                            const convertedFiles: any[] = [];
                                            acceptedFiles.forEach(
                                                (file: any) => {
                                                    const data = {
                                                        id: uuid(),
                                                        path: file.path,
                                                        lastModified:
                                                            file.lastModified,
                                                        lastModifiedDate:
                                                            file.lastModifiedDate,
                                                        name: file.name,
                                                        size: file.size,
                                                        type: file.type,
                                                        webkitRelativePath:
                                                            file.webkitRelativePath,
                                                        preview:
                                                            URL.createObjectURL(
                                                                file,
                                                            ),
                                                    };
                                                    convertedFiles.push(data);
                                                },
                                            );
                                            setFiles([
                                                ...files,
                                                ...convertedFiles,
                                            ]);
                                        }}
                                    />
                                </Box>
                                <AnimatePresence>
                                    {files.length > 0 && (
                                        <>
                                            <Grid
                                                key="preview-list"
                                                container
                                                rowSpacing={2}
                                                columnSpacing={2}
                                                {...varFadeInUp}
                                                component={motion.div}
                                            >
                                                <AnimatePresence>
                                                    {files.map((file: any) => (
                                                        <FileUploadPreviewCard
                                                            key={file.id}
                                                            file={file}
                                                            removeFileHandler={
                                                                removeFileHandler
                                                            }
                                                            url={file.preview}
                                                        />
                                                    ))}
                                                </AnimatePresence>
                                            </Grid>
                                            <Stack
                                                key="convert-button"
                                                sx={{ width: "100%" }}
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                                {...varFadeInUp}
                                                component={motion.div}
                                                spacing={2}
                                            >
                                                <Button
                                                    onClick={() => setFiles([])}
                                                    variant="text"
                                                    color="error"
                                                >
                                                    {t("REMOVE_ALL")}
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        convertFilesHandler()
                                                    }
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    {t("CONVERT")}
                                                </Button>
                                            </Stack>
                                        </>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </>
                )}
            </AnimatePresence>
        </ContentTitle>
    );
}
