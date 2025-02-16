// pages/barchart.js
"use client"; // Required for using Ant Design Charts in Next.js 13+


import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './style.css'
import Image from "next/image"

function itemCashFormatter(value) {
  return `${value}$`;
}

const FoodWidget = (props) => {

  const chartSetting = {
    xAxis: [
      {
        label: 'Amount ($)',
      },
    ],
    width: 800,
    height: 400,

  };

  return (
    <>
      <div
        className='detail-div'>
        <div className='chart-head'>
          <Image src="/images/icons8-bagel-48.png" alt="Logo" width={40} height={40} ></Image>
          <label className='chart-head-title'>Food/Beverage (Top 5 Profitable Items)</label>
          </div>
        <BarChart
          margin={{ left: 150 }}
          colors={["#394deb", "#f59269", "#AAB6FB", "#FB7B8E", "#FAA7B8"]}
          dataset={props.top5Items}
          yAxis={[{
            scaleType: 'band', dataKey: 'item',
            labelStyle: { fontSize: 18, fill: "black", fontFamily: "verdana" }, // Style it
            position: "left", // Move inside view 
          }]}
          series={[
            { dataKey: "online_amount", stack: "a", label: 'Online Sale', valueFormatter: itemCashFormatter },
            { dataKey: "dineIn_amount", stack: "a", label: 'DineIn Sale', valueFormatter: itemCashFormatter }
          ]}
          layout="horizontal"
          barLabel="value"
          sx={{ "& .MuiChartsAxis-tickLabel": { fontFamily: "verdana !important", fontSize: "14px !important" }, }}
          {...chartSetting}
        />
      </div>
      <div
        className='detail-div'>
        <div className='chart-head'>
          <Image src="/images/icons8-bagel-48.png" alt="Logo" width={40} height={40} ></Image>
          <label className='chart-head-title'>Food/Beverage (Top 5 Selling items)</label>
          </div>
        <BarChart
          margin={{ left: 150 }}
          colors={["#394deb", "#f59269", "#AAB6FB", "#FB7B8E", "#FAA7B8"]}
          dataset={props.top5SaleItems}
          yAxis={[{
            scaleType: 'band', dataKey: 'item',
            labelStyle: { fontSize: 18, fill: "black", fontFamily: "verdana" }, // Style it
            position: "left", // Move inside view 
          }]}
          series={[
            { dataKey: "onlineQuantity", stack: "a", label: 'Online Sale', valueFormatter: itemCashFormatter },
            { dataKey: "dineQuantity", stack: "a", label: 'DineIn Sale', valueFormatter: itemCashFormatter }
          ]}
          layout="horizontal"
          barLabel="value"
          sx={{ "& .MuiChartsAxis-tickLabel": { fontFamily: "verdana !important", fontSize: "14px !important" }, }}
          {...chartSetting}
        />
      </div>
    </>
  );
};

export default FoodWidget;
