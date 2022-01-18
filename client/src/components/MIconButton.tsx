import { forwardRef } from "react";
import { IconButton } from "@mui/material";
import { ButtonAnimate } from "./animate";

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ children, ...other }, ref) => (
    <ButtonAnimate>
        <IconButton ref={ref} {...(other as any)}>
            {children}
        </IconButton>
    </ButtonAnimate>
));

export default MIconButton;
