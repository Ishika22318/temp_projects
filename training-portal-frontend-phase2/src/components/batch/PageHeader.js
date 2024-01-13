import React from "react";
import { Box, Button } from "@mui/material";
import BatchHeader from "./BatchHeader";
import * as styles from './PageHeaderStyles';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as create } from './create.svg';
import { handleError } from "../../utils/handleError";
import { downloadAllBatch } from '../../services/batchapi';
import { useNavigate } from "react-router-dom";

const PageHeader = ({ handleClickOpen }) => {
    const downloadAllRows = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.clear();
                navigate("/401");
            }
            const { csvData } = await downloadAllBatch();
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'batch.csv';
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            //  to handle error
            handleError(error, navigate)
        }
    }

    const navigate = useNavigate();

    return (
        <Box style={styles.pageStyle}>
            <div style={styles.bx1}>
                <BatchHeader />
                <div style={{ display: "flex", alignItems: "center", }}>
                    <Button variant="outlined" size="small" sx={styles.btn1} onClick={downloadAllRows} data-testid="download-icon-button">
                        Download CSV
                    </Button>
                    <Button onClick={handleClickOpen} variant="contained" size="small" sx={styles.btn2} data-testid="create-icon-button"> <SvgIcon component={create} />
                        Create
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default PageHeader;
