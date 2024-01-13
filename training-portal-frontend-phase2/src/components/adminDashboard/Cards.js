import React from "react";
import { Card, Grid, Box } from "@mui/material";
import RowCard from "./Card";

const Cards = ({ coursesCardData }) => {
  // console.log('hey',coursesCardData)
  return (
    <div>
      <Grid
        container
        sx={{
          justifyContent: "center",
          maxHeight: "70vh",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox-specific property to hide scrollbar
          "&::-webkit-scrollbar": {
            width: "0.3em", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#f7f7f7", // Color of the thumb
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent", // Color of the track
          },
        }}
      >
        {Object.keys(coursesCardData).map((item, index) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            key={index}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", m: 4, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <RowCard coursesCardData={coursesCardData} item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
