import Layout from "src/layout";
import store from "@redux/store";
import { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { SettingsProvider } from "src/contexts/SettingsContext";
import ThemeConfig from "src/theme";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <SettingsProvider>
                <ThemeConfig>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeConfig>
            </SettingsProvider>
        </Provider>
    );
}

export default MyApp;
