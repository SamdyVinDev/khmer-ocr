import { Box, Stack } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import { useSettings } from "src/contexts/SettingsContext";

const index = ({ children }: { children: ReactNode }) => {
    const { themeMode } = useSettings();
    return (
        <Stack>
            <Head>
                <title>Khmer O R C</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            <Navbar />
            <Box sx={{ mb: 5 }} />
            {children}
            <Box sx={{ mb: 5 }} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={true}
                pauseOnHover={false}
                theme={themeMode as any}
            />
        </Stack>
    );
};

export default index;
