import React, { useState } from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ width, height }) => {
  const [datag, setdata] = useState([
    ["", ""],
    ["Aws", 10],
    ["Angular", 40],
    ["GCP", 2],
    ["SQL", 5],
    ["MongoDB", 1],
    ["RDBMS", 7],
    ["Java", 7],
    ["Node Js", 10],
    ["React", 50],
    ["Git", 20],
    ["Python", 30],
    ["Advance JavaScript", 60],
    ["Advance HTML", 70],
  ]);

  const options = {
    // title: "Pie Chart",
    titleTextStyle: {
      color: "#000000",
    },
    is3D: false,
    backgroundColor: "#fff",
    legend: {
      position: "labeled",
      alignment: "center",
      textStyle: {
        color: "#000000",
      },
    },
    pieHole: 0.25,
    pieSliceText: "value",
    // pieStartAngle: is3d ? 0 : pieStartAngle,
    colors: [
      "#FEFF86",
      "#75C2F6",
      "#CEE6F3",
      "#9BE8D8",
      "#F7EC59",
      "#4A55A2",
      "#068FFF",
      "#ACFADF",
      "#27005D",
      "#9AC5F4",
      "#0A2647",
      "#00DFA2",
      "#B799FF",
      "#19A7CE",
      "#FCFFB2",
      "#FF6969",
      "#05BFDB",
    ],
  };

  return (
    <Chart
      chartType="PieChart"
      data={datag}
      options={options}
      width={width}
      height={height}
    />
  );
};

export default PieChart;