import React from "react"
import { Grid, Box, Typography } from '@mui/material'
import * as styles from './LearningPathCurveStyles';


function LearningPathCurve({ curveIndex, lastIndex, programName, handleSelectedCurveIndex, selectedCurveIndex }) {

  const customBorder = {
    borderLeft: curveIndex === 0 ? "solid 1px rgba(0, 0, 0, 0.2)" : "none",
    borderRight: curveIndex === lastIndex ? "solid 1px rgba(0, 0, 0, 0.2)" : "none",
    borderTopRightRadius: curveIndex === lastIndex ? "12px" : "5px",
    borderBottomRightRadius: curveIndex === lastIndex ? "12px" : "5px",
  }
  const index = selectedCurveIndex;
  const selectedBorderColor = {
    borderColor: curveIndex === index ? "rgba(13, 72, 150, 1)" : "rgba(0, 0, 0, 0.2)",
  }
  const programIndexBackground = {
    background: curveIndex === index ? "rgba(13, 72, 150, 1)" : "#ECF4FD",
    color: curveIndex === index ? "#ffffff" : "#000000"
  }
  const programColor = {
    color: curveIndex === index ? "rgba(13, 72, 150, 1)" : "#0A0A0A"
  }
  const programDurationColor = {
    color: curveIndex === index ? "#474747" : "rgba(112, 112, 112, 1)",
  }

  return (

    <Grid item sx={styles.container} md={12 / (lastIndex + 1) - 0.4} xs={12} >

      <Grid item style={{ ...customBorder, ...selectedBorderColor }} sx={styles.dataContainer} xs={12} onClick={() => { handleSelectedCurveIndex(curveIndex) }}>

        {
          curveIndex !== 0 && lastIndex !== 0 &&
          <Grid style={{ ...styles.leftTriangle, ...selectedBorderColor }}></Grid>
        }

        <Box sx={styles.programIndexContainer} >
          <Box sx={{ ...styles.programIndex, ...programIndexBackground }}>{curveIndex + 1}</Box>
        </Box>

        <Box sx={styles.programContainer}>
          <Box>
            <Typography variant="div" sx={{ ...styles.program, ...programColor }}> {programName}</Typography>
            <br></br>
            <Typography variant="div" sx={{ ...styles.programDuration, ...programDurationColor }}></Typography>
          </Box>
        </Box>
      </Grid>

      {
        curveIndex !== lastIndex &&
        <Grid style={{ ...styles.triangle, ...selectedBorderColor }}></Grid>
      }
    </Grid>
  )
}
export default LearningPathCurve






