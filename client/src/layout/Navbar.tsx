import LanguageMenu from "@components/LanguageMenu";
import ThemeModeMenu from "@components/ThemeModeMenu";
import {
    Menu,
    ContentCutOutlined,
    DocumentScannerOutlined,
    CopyAllOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Drawer,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Stack,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSettings } from "src/contexts/SettingsContext";
import { s4t } from "src/utils/formatString";

const styles = {
    Navbar: {
        p: 2,
        justifyContent: "space-between",
        alignItems: "center",
        color: "primary.main",
        boxShadow: 6,
        height: "60px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "background.paper",
    },
} as const;

export const navItems = [
    {
        id: "url-id#1",
        label: s4t("Document Line Cropping"),
        url: "document-line-cropping",
        icon: <ContentCutOutlined color="primary" sx={{ fontSize: "50px" }} />,
        logo: "static/crop-pdf.png",
        desc: {
            en: "Cropping is the process of removing portions of a photo to create focus ... Straighten tool, draw a reference line to straighten the photo.",
            kh: "ការច្រឹបគឺជាដំណើរការនៃការដកចេញផ្នែកនៃរូបថតដើម្បីបង្កើតការផ្តោតអារម្មណ៍ ... តម្រង់ឧបករណ៍ គូរបន្ទាត់យោងដើម្បីតម្រង់រូបថត។",
            ch: "裁剪是删除照片的一部分以创建焦点的过程... 拉直工具，绘制参考线以拉直照片。",
        },
        disabled: false,
    },
    {
        id: "url-id#2",
        label: s4t("PDF To Image Converter"),
        url: "pdf-to-image",
        icon: (
            <DocumentScannerOutlined
                color="primary"
                sx={{ fontSize: "50px" }}
            />
        ),
        logo: "static/pdf-to-png.png",
        desc: {
            en: "From image to text-easy conversion of photos, pictures, screenshots, and more to text. Extract text from all kinds of images with this online converter",
            kh: "ពីរូបភាពទៅជាអត្ថបទ ងាយស្រួលបំប្លែងរូបថត រូបភាព រូបថតអេក្រង់ និងច្រើនទៀតទៅជាអត្ថបទ។ ស្រង់អត្ថបទពីរូបភាពគ្រប់ប្រភេទដោយប្រើកម្មវិធីបំប្លែងតាមអ៊ីនធឺណិតនេះ។",
            ch: "从图像到文本 - 将照片、图片、屏幕截图等轻松转换为文本。 使用此在线转换器从各种图像中提取文本",
        },
        disabled: true,
    },
    {
        id: "url-id#3",
        label: s4t("Convert To Word"),
        url: "pdf-to-word",
        icon: <CopyAllOutlined color="primary" sx={{ fontSize: "50px" }} />,
        logo: "static/pdf-to-word.png",
        desc: {
            en: "Text recognition without software installation or download. This OCR converter allows you to convert to the Microsoft Word formats DOC and DOCX.",
            kh: "ការទទួលស្គាល់អត្ថបទដោយមិនចាំបាច់ដំឡើងកម្មវិធី ឬទាញយក។ កម្មវិធីបំលែង OCR នេះអនុញ្ញាតឱ្យអ្នកបំប្លែងទៅជាទម្រង់ Microsoft Word DOC និង DOCX ។",
            ch: "无需软件安装或下载的文本识别。 此 OCR 转换器允许您转换为 Microsoft Word 格式的 DOC 和 DOCX。",
        },
        disabled: true,
    },
];

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const { t } = useSettings();

    return (
        <>
            {/* Navbar */}
            <Stack direction={"row"} sx={styles.Navbar}>
                <Link href={"/"}>
                    <a style={{ textDecoration: "none", color: "unset" }}>
                        <Stack direction={"row"} alignItems="center">
                            <Box
                                component="img"
                                src="favicon/logo.png"
                                sx={{
                                    height: "25px",
                                    width: "30px",
                                    objectFit: "cover",
                                    objectPosition: "0 0",
                                }}
                            />
                            <Typography variant="h5">Khmer OCR</Typography>
                        </Stack>
                    </a>
                </Link>
                <Stack direction={"row"}>
                    {!isMobile && <LanguageMenu />}
                    <ThemeModeMenu />
                    <Tooltip title="Menu">
                        <IconButton onClick={() => setOpenMenu(true)}>
                            <Menu />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            {/* Menu */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={openMenu}
                onClose={() => setOpenMenu(false)}
            >
                <Stack sx={{ width: "220px" }}>
                    <Stack
                        direction="row"
                        sx={{
                            p: 2,
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h5" color="primary">
                            {t("MENU")}
                        </Typography>
                        {isMobile && <LanguageMenu />}
                    </Stack>
                    <Divider sx={{ backgroundColor: "primary.main" }} />
                    <MenuList>
                        {navItems.map((item) =>
                            item.disabled ? (
                                <MenuItem
                                    sx={{
                                        py: 2,
                                        color: "gray",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <ListItemText>{t(item.label)}</ListItemText>
                                </MenuItem>
                            ) : (
                                <Link href={item.url}>
                                    <MenuItem
                                        sx={{ py: 2 }}
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <ListItemText>
                                            {t(item.label)}
                                        </ListItemText>
                                    </MenuItem>
                                </Link>
                            ),
                        )}
                    </MenuList>
                </Stack>
            </Drawer>
        </>
    );
}
