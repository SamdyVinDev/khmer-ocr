import * as React from "react";
import {
    Stack,
    Modal,
    Typography,
    Button,
    Box,
    Icon,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInMapRoundedIcon from "@mui/icons-material/ZoomInMapRounded";
import ZoomOutMapRoundedIcon from "@mui/icons-material/ZoomOutMapRounded";
import { red } from "@mui/material/colors";
import { Theme } from "@mui/system";

const styles = {
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { sm: "70vw", xs: "100vw" },
        height: { sm: "70vh", xs: "100vh" },
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        transition: "all 200ms ease-in-out",
    },
    header: {
        transition: "all 200ms ease-in-out",

        height: "50px",
        width: "100%",
        backgroundColor: "primary.main",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        color: "primary.contrastText",
    },
    zoomButton: {
        height: "25px",
        width: "25px",
        backgroundColor: "greenyellow",
        color: "limegreen",
        transition: "all 200ms ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
            backgroundColor: "greenyellow",
            color: "whtie",
            filter: "opacity(0.7)",
        },
        "& svg": {
            width: "18px",
            height: "18px",
        },
    },
    closeButton: {
        height: "25px",
        width: "25px",
        backgroundColor: red[300],
        color: red[800],
        transition: "all 200ms ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
            backgroundColor: red[300],
            color: red[800],
            filter: "opacity(0.7)",
        },
        "& svg": {
            width: "18px",
            height: "18px",
        },
    },
    content: {
        transition: "all 200ms ease-in-out",
        height: "100%",
        width: "100%",
        overflow: "auto",
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
        display: "flex",
        flexDirection: "column",
    },
} as const;

const CustomModal = ({
    open,
    handleClose,
    title,
    children,
    fullscreen = false,
    noZoom = false,
    small = false,
}: {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
    fullscreen?: boolean;
    noZoom?: boolean;
    small?: boolean;
}) => {
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const [isFullscreen, setIsFullscreen] = React.useState(fullscreen);
    const [showZoomButton, setShowZoomButton] = React.useState(
        !noZoom && !small,
    );

    React.useEffect(() => {
        if (isMobile) {
            setShowZoomButton(false);
        } else {
            setShowZoomButton(!noZoom && !small);
        }
    }, [isMobile]);

    React.useEffect(() => {
        if (!open) {
            setIsFullscreen(false);
        }
    }, [open]);
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    ...styles.root,
                    ...((isFullscreen || isMobile) && {
                        width: "100vw",
                        height: "100vh",
                        borderRadius: 0,
                    }),
                    ...(small &&
                        !isMobile && { width: "auto", height: "auto" }),
                }}
            >
                <Box
                    sx={{
                        ...styles.header,
                        ...((isFullscreen || isMobile) && {
                            borderRadius: 0,
                        }),
                    }}
                >
                    <Typography variant="h6">{title}</Typography>
                    <Stack direction={"row"} spacing={1}>
                        {showZoomButton && (
                            <IconButton
                                sx={styles.zoomButton}
                                onClick={() => setIsFullscreen(!isFullscreen)}
                            >
                                {isFullscreen ? (
                                    <ZoomInMapRoundedIcon />
                                ) : (
                                    <ZoomOutMapRoundedIcon />
                                )}
                            </IconButton>
                        )}
                        <IconButton
                            sx={styles.closeButton}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        ...styles.content,
                        ...((isFullscreen || isMobile) && {
                            borderRadius: 0,
                        }),
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};

export default CustomModal;
