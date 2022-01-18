import { FileUploadRounded } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { isString } from "lodash";
import { useDropzone } from "react-dropzone";
import { useSettings } from "src/contexts/SettingsContext";
import { fData } from "src/utils/formatNumber";
// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }: any) => ({
    outline: "none",
    display: "flex",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(5, 0),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("padding"),
    // backgroundColor: theme.palette.background.neutral,
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    "&:hover": {
        opacity: 0.72,
        cursor: "pointer",
    },
    [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

export default function UploadMultipleFiles({
    error,
    files,
    sx,
    ...other
}: any) {
    const { t } = useSettings();
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        multiple: true,
        ...other,
    });

    const ShowRejectionItems = () => (
        <Paper
            variant="outlined"
            sx={{
                py: 1,
                px: 2,
                mt: 3,
                borderColor: "error.light",
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            }}
        >
            {fileRejections.map(({ file, errors }: any) => {
                const { path, size }: any = file;
                return (
                    <Box key={path} sx={{ my: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                            {path} - {fData(size)}
                        </Typography>
                        {errors.map((e: any) => (
                            <Typography
                                key={e.code}
                                variant="caption"
                                component="p"
                            >
                                - {e.message}
                            </Typography>
                        ))}
                    </Box>
                );
            })}
        </Paper>
    );

    return (
        <Box sx={{ width: "100%", ...sx }}>
            <DropZoneStyle
                {...getRootProps()}
                sx={{
                    ...(isDragActive && { opacity: 0.72 }),
                    ...((isDragReject || error) && {
                        color: "error.main",
                        borderColor: "error.light",
                        bgcolor: "error.lighter",
                    }),
                }}
            >
                <input {...getInputProps()} />

                <Stack
                    sx={{ justifyContent: "center", alignItems: "center" }}
                    spacing={3}
                >
                    <Box
                        component="img"
                        src="static/browse.svg"
                        sx={{ width: 100 }}
                    />

                    <Typography gutterBottom variant="h5">
                        {t("DRAG_AND_DROP_YOUR_FILES_HERE")}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {t("OR")}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ height: "60px", width: "180px" }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FileUploadRounded
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                }}
                            />
                            <Typography variant="h6" noWrap>
                                {t("CHOOSE_FILES")}
                            </Typography>
                        </Stack>
                    </Button>

                    {/* {file && (
                        <Box
                            component="img"
                            alt="file preview"
                            src={isString(file) ? file : file.preview}
                            sx={{
                                top: 8,
                                borderRadius: 1,
                                objectFit: "cover",
                                position: "absolute",
                                width: "calc(100% - 16px)",
                                height: "calc(100% - 16px)",
                            }}
                        />
                    )} */}
                </Stack>
            </DropZoneStyle>

            {fileRejections.length > 0 && <ShowRejectionItems />}
        </Box>
    );
}
