import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function NotFoundPage() {
    return (
        <Container
            maxWidth="sm"
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                component="img"
                src={"static/not_found.svg"}
                width="250px"
                height="250px"
            />
            <Typography variant="h5">Page Not Found</Typography>
        </Container>
    );
}
