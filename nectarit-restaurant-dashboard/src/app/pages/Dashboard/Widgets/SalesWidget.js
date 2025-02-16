// pages/barchart.js
"use client"; // Required for using Ant Design Charts in Next.js 13+


import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import './style.css'
import Image from "next/image"

function itemCashFormatter(value) {
  return `${value}$`;
}

const SalesWidget = (props) => {

  return (
    <div className='detail-div'>
      <div className='chart-head'>
        <Image src="/images/icons8-sales-48.png" alt="Logo" width={40} height={40} ></Image>
        <label className='chart-head-title'>Sales and Profit</label>
      </div>

      <div className='sales-charts'>
        <div className='pie-div mar-lr-20'>
          <div className='pie-head'>
            <span className='pie-head-name'>Order Type profit</span>
          </div>
          <PieChart
            colors={["#394deb", "#f59269"]}
            series={[
              {
                data: props.orderTypeData,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                arcLabel: (item) => `$${item.value}`,

              },
            ]}
            width={400}
            height={200}
          />
        </div>

        <div className='pie-div mar-lr-20'>
          <div className='pie-head'>
            <span className='pie-head-name'>Sales Amount ranges</span>
          </div>

          <PieChart
            colors={["#394deb", "#f59269", "#AAB6FB", "#FB7B8E", "#FAA7B8"]}
            series={[
              {
                data: props.amountRanges,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                arcLabel: (item) => `${item.value} orders`,
              },
            ]}
            width={400}
            height={200}
          />
        </div>
        {/* <div className='pie-div mar-lr-20'>
          <div className='pie-head'>
            <span className='pie-head-name'>Sale Amount ranges</span>
          </div>
        <BarChart
                colors={["#394deb","#f59269","#AAB6FB","#FB7B8E","#FAA7B8"]}
                    dataset={props.amountRanges}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
                    series={[{ dataKey: "value", stack:"b", label: 'Total orders', valueFormatter: (value)=> value  },
                    // { dataKey: "dineIn_amount",stack:"a", label: 'DineIn Sale', valueFormatter: itemCashFormatter }
                ]}
                    layout="horizontal"
                    barLabel="value"
                    {...chartSetting}
                />
                </div> */}
      </div>
    </div>
  );
};

export default SalesWidget;
