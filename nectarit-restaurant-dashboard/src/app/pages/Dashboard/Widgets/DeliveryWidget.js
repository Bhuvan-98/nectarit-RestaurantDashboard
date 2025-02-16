// pages/barchart.js
"use client"; // Required for using Ant Design Charts in Next.js 13+


import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './style.css'
import GaugeChart from '../../../components/GuageChart'
import Image from "next/image"

function itemCashFormatter(value) {
  return `${value}`;
}

const DeliveryWidget = (props) => {
  const chartSetting = {
    xAxis: [
      {
        label: 'Order Status',
      },
    ],
    width: 800,
    height: 400,

  };

  return (
    <div className='detail-div'>
      <div className='chart-head'>
        <Image src="/images/icons8-delivery-48.png" alt="Logo" width={40} height={40} ></Image>
        <label className='chart-head-title'>Delivery Details</label>
      </div>

      <div className='delivery-data'>
        <GaugeChart label={"Total Order Pending"} valueMin={0} valueMax={props.deliveryDetails.total} value={props.deliveryDetails.pending} />
        <GaugeChart label={"Total InTransit"} valueMin={0} valueMax={props.deliveryDetails.total} value={props.deliveryDetails.inTransit} />
        <GaugeChart label={"Total Delivered"} valueMin={0} valueMax={props.deliveryDetails.total} value={props.deliveryDetails.delivered} />

      </div>

      <div className='chart-head'>Delivery Person Details</div>
      <BarChart
        margin={{ left: 150 }}
        title='Delivery Persons Details'
        colors={["#3cb86a", "#FAA7B8", "#3cb86a", "#FAA7B8"]}
        dataset={props.deliveryDetails.persons}
        yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
        series={[
          { dataKey: "DineDelivered", stack: "DineIn", label: 'DineIn - Delivered', valueFormatter: itemCashFormatter },
          { dataKey: "DineTransit", stack: "DineIn", label: 'DineIn - In Transit', valueFormatter: itemCashFormatter },
          { dataKey: "onlineDelivered", stack: "online", label: 'Online - Delivered', valueFormatter: itemCashFormatter },
          { dataKey: "onlineInTransit", stack: "online", label: 'Online - In Transit', valueFormatter: itemCashFormatter }
        ]}
        layout="horizontal"
        barLabel="value"
        {...chartSetting}
        sx={{ "& .MuiChartsAxis-tickLabel": { fontFamily: "verdana !important", fontSize: "14px !important" }, }}
      />
    </div>
  );
};

export default DeliveryWidget;
