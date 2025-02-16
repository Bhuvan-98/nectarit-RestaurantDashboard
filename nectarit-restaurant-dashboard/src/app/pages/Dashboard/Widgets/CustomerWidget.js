// pages/barchart.js
"use client"; // Required for using Ant Design Charts in Next.js 13+


import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './style.css'
import Image from "next/image"

function itemCashFormatter(value) {
  return `${value}$`;
}

const CustomerWidget = (props) => {

  const chartSetting = {
    xAxis: [
      {
        label: 'Amount ($)',
      },
    ],
    width: 600,
    height: 400,

  };

  return (
    <div className='detail-div'>

      <div className='chart-head'>
        <Image src="/images/icons8-user-48.png" alt="Logo" width={40} height={40} ></Image>
        <label className='chart-head-title'>Customers (Top 5)</label>
      </div>

      <div>

      </div>
      <BarChart
        colors={["#394deb", "#f59269", "#AAB6FB", "#FB7B8E", "#FAA7B8"]}
        margin={{ left: 150 }}
        dataset={props.top5Customer}
        yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
        series={[{ dataKey: "amount", stack: "b", label: 'Amount $', valueFormatter: itemCashFormatter },
          // { dataKey: "dineIn_amount",stack:"a", label: 'DineIn Sale', valueFormatter: itemCashFormatter }
        ]}
        layout="horizontal"
        sx={{ "& .MuiChartsAxis-tickLabel": { fontFamily: "verdana !important", fontSize: "14px !important" }, }}
        {...chartSetting}
      />
    </div>
  );
};

export default CustomerWidget;
