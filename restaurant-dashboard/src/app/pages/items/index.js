// pages/barchart.js
"use client"; // Required for using Ant Design Charts in Next.js 13+


import React from 'react';
import { Bar } from '@ant-design/charts';
import { Card } from 'antd';
import {orders} from '../../data/ordersdata'
const BarChart = () => {
  const prepareBarChartData = (orders) => {
    const itemCount = {};
  
    // Loop through each order and each item within the order
    orders.forEach(order => {
      order.Items.forEach(item => {
        if (itemCount[item.Item_Name]) {
          itemCount[item.Item_Name] += item.Quantity;
        } else {
          itemCount[item.Item_Name] = item.Quantity;
        }
      });
    });
  
    // Convert item count object into an array of objects for charting
    const chartData = Object.entries(itemCount).map(([itemName, count]) => ({
      item: itemName,
      count: count
    }));
  
    return chartData;
  };
  
  const getTop5Items = (data) => {
    // Sort by count in descending order and take the top 5
    return data.sort((a, b) => b.count - a.count).slice(0, 5);
  };

  // Prepare the data for the bar chart
  const barChartData = prepareBarChartData(orders);
  const top5Items = getTop5Items(barChartData);
  
  console.log(barChartData);
  

 

  // Bar Chart Configuration
  const config = {
    data:top5Items,
    xField: 'item',
    yField: 'count',
    seriesField: 'item',
    colorField: 'item',
    legend: {
      position: 'top-left',
    },
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
      },
    },
    tooltip: {
      formatter: (datum) => ({ name: datum.category, value: datum.value }),
    },
    animation: {
      appear: {
        animation: 'fade-in',
        duration: 1000,
      },
    },
  };

  return (
    <div style={{ padding: '50px' }}>
      <Card title="Classification Bar Chart" bordered={false}>
        <Bar {...config} />
      </Card>
    </div>
  );
};

export default BarChart;
