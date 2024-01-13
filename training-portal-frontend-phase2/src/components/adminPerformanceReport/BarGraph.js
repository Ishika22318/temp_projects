import React from 'react';

import Chart from 'react-apexcharts';

export default function BarGraph({ title = 'Overall Performance', width }) {
  const options = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4',
        'Category 5',
      ],
      title: {
        text: 'Categories',
      },
      // categories: ["Overall Assessment", "Assignment", "Attendance & Participation", "Time Management", "Communication Skills",],
    },
    yaxis: {
      title: {
        text: 'Y-Axis',
        // offsetX: 10,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: title,
      align: 'center',
      margin: 10,
      offsetY: 20,
      style: {
        fontSize: '24px',
      },
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#fde047', '#ef4444'],
  };

  const series = [
    {
      name: 'Data 1',
      data: [12, 19, 3, 4, 10],
    },
    {
      name: 'Data 2',
      data: [5, 9, 11, 7, 5],
    },
    {
      name: 'Data 3',
      data: [7, 3, 8, 20, 1],
    },
    {
      name: 'Data 4',
      data: [20, 19, 10, 19, 2],
    },
    {
      name: 'Data 5',
      data: [30, 9, 15, 12, 11],
    },
  ];

  return <Chart options={options} series={series} type='bar' width={width} />;
}
