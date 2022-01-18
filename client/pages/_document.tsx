import Document, {
    DocumentContext,
    DocumentInitialProps,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";

class CustomDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <link rel="apple-touch-icon" href="/favicon/icon.png" />
                    <meta name="robots" content="all" />
                    <meta name="description" content={"Khmer OCR"} />
                    <meta
                        name="keywords"
                        content={
                            "khmer ocr,pdf convert,convert pdf,pdf converter"
                        }
                    />
                    <meta property="og:image" content="/favicon/logo.png" />
                    <meta name="author" content="Khmer OCR" />
                    <meta name="theme-color" content="#0088ff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
