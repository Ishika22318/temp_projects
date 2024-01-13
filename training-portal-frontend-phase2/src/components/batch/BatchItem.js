import React from "react";
import { Box } from "@mui/material";
import BatchHeader from "./BatchHeader";


const BatchItem = () => {

    return (
        <Box sx={{ borderBottom: 1, borderColor: "divider", background: "#F6F6F6" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "72px",

                }}
            >
                <BatchHeader />

            </div>
        </Box>
    );
};

export default BatchItem;
