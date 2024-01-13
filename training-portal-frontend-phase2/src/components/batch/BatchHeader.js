import React from "react";
import { Box, Typography } from "@mui/material";
import * as styles from './BatchHeaderStyles';


const BatchHeader = () => {
    return (
        <Box sx={styles.headerStyle}>
            <Typography variant="text" sx={styles.bx}>
                Batches
            </Typography>
        </Box>
    );
};

export default BatchHeader;