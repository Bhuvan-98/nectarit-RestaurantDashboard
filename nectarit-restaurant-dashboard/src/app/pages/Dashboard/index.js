// pages/barchart.js
"use client"; // Required for using Ant Design Charts in Next.js 13+


import React, { useEffect, useState } from 'react';
import { orders } from '../../data/ordersdata'
import SalesWidget from './Widgets/SalesWidget'
import CustomerWidget from './Widgets/CustomerWidget'
import FoodWidget from './Widgets/FoodWidget'
import DeliveryWidget from './Widgets/DeliveryWidget'

import './style2.css'

const Dashboard = () => {

  const [barChartData, setBarChartData] = useState([])
  const [top5Customer, setTopCustomer] = useState([])
  const [top5ProfitableItems, setTop5ProfitableItems] = useState([])
  const [top5SaleItems, setTop5SaleItems] = useState([])
  const [orderTypeData, setOrderTypeData] = useState([])
  const [saleDetails, setSaleDetails] = useState({
    high: 0,
    low: 0,
    avrAmt: 0,
    threeRanges: [
      { id: "Low", label: "", start: 0, end: 0, value: 0 },
      { id: "Middle", label: "", start: 0, end: 0, value: 0 },
      { id: "High", label: "", start: 0, end: 0, value: 0 }
    ],
    data: []
  })

  const [deliveryDetails, setDeliveryDetails] = useState({
    pending: 0,
    inTransit: 0,
    delivered: 0,
    total: 0,
    persons: []
  })

  
  useEffect(() => {    
    prepareBarChartData(orders);
    prepareCustomDetails(orders);
  }, [])

  useEffect(() => {
    getTop5Items(barChartData);
    getOrderTypeDetails(barChartData);
  }, [barChartData])


  const prepareBarChartData = (orders) => {
    const itemCountByProfit = [];
    const itemCountByQuantity = [];
    let deliveryDts = {
      pending: 0,
      inTransit: 0,
      delivered: 0,
      total: 0,
      persons: []
    };

    var amount = {
      high: 0,
      low: 0,
      avrAmt: 0,
      threeRanges: [
        { id: "Low", label: "", start: 0, end: 0, value: 0 },
        { id: "Middle", label: "", start: 0, end: 0, value: 0 },
        { id: "High", label: "", start: 0, end: 0, value: 0 }
      ],
      data: []
    }

    // Loop through each order and each item within the order
    orders.forEach(order => {

      var amt = 0;
      order.Items.map(item => amt += item.Item_Price)
      amount.data.push(amt);

      order.Items.forEach(item => {

        var existItemQuantity = itemCountByQuantity.find(x => x.item == item.Item_Name);
        if(existItemQuantity == undefined){
          existItemQuantity = {
            item :  item.Item_Name,
            totalQuantity : 0,
            onlineQuantity : 0,
            dineQuantity : 0
          }
          itemCountByQuantity.push(existItemQuantity)
        }

        existItemQuantity.totalQuantity+= item.Quantity;;        
        if(order.Order_Type == "Online"){
          existItemQuantity.onlineQuantity+= item.Quantity;
        }
        else{
          existItemQuantity.dineQuantity+= item.Quantity;
        }


        var existItem = itemCountByProfit.find(x => x.item == item.Item_Name);
        if (existItem != undefined) {
          existItem.totalAmount += item.Total_Price;
          existItem.totalQuantity += item.Quantity;

          if (order.Order_Type == "Dine In") {
            existItem.dineIn_amount += item.Total_Price;
            existItem.dineIn_quantity += item.Quantity;
          }
          else {
            existItem.online_amount += item.Total_Price;
            existItem.online_quantity += item.Quantity;
          }
        }
        else {
          let onlineDetails = { quantity: 0, amount: 0 }
          let dineInDetails = { quantity: 0, amount: 0 }

          if (order.Order_Type == "Dine In") {
            dineInDetails.quantity = item.Quantity;
            dineInDetails.amount = item.Item_Price;
          }
          else {
            onlineDetails.quantity = item.Quantity;
            onlineDetails.amount = item.Item_Price;
          }

          itemCountByProfit.push({
            item: item.Item_Name,
            online_quantity: onlineDetails.quantity,
            online_amount: onlineDetails.amount,
            dineIn_quantity: dineInDetails.quantity,
            dineIn_amount: dineInDetails.amount,
            totalAmount: item.Item_Price,
            totalQuantity: item.Quantity
          })
        }
      });

      deliveryDts.total++;
      switch (order.Order_Status) {
        case "Delivered":
          deliveryDts.delivered++;
          break;
        case "In Transit":
          deliveryDts.inTransit++;
          break;
        case "Pending":
          deliveryDts.pending++;
          break;
        default:
          break;
      }

      var existPer = deliveryDts.persons.find(x => x.name == order.Delivery_Person);
      if (existPer == undefined) {
        existPer = {
          name: order.Delivery_Person,
          onlineDelivered: 0,
          onlineInTransit: 0,
          DineDelivered: 0,
          DineTransit: 0
        }

        deliveryDts.persons.push(existPer);
      }

      if (order.Order_Type == "Online") {
        if (order.Delivery_Status == "Delivered") {
          existPer.onlineDelivered += 1;
        }
        else if (order.Delivery_Status == "In Transit") {
          existPer.onlineInTransit += 1;
        }
      }
      else if (order.Order_Type == "Dine In") {
        if (order.Delivery_Status == "Delivered") {
          existPer.DineDelivered += 1;
        }
        else if (order.Delivery_Status == "In Transit") {
          existPer.DineTransit += 1;
        }
      }


    });

    amount.data = amount.data.sort((a, b) => b - a);

    amount.high = Math.floor(amount.data[0])
    amount.low = Math.ceil(amount.data[amount.data.length - 1])
    amount.avrAmt = Math.round((amount.high - amount.low) / 3);


    amount.threeRanges[0].start = amount.low;
    amount.threeRanges[0].end = amount.low + amount.avrAmt;
    amount.threeRanges[0].label = `$${amount.threeRanges[0].start} - $${amount.threeRanges[0].end}`

    amount.threeRanges[1].start = amount.threeRanges[0].end;
    amount.threeRanges[1].end = amount.threeRanges[0].end + amount.avrAmt;
    amount.threeRanges[1].label = `$${amount.threeRanges[1].start} - $${amount.threeRanges[1].end}`

    amount.threeRanges[2].start = amount.threeRanges[1].end;
    amount.threeRanges[2].end = amount.high;
    amount.threeRanges[2].label = `$${amount.threeRanges[2].start} - $${amount.threeRanges[2].end}`

    amount.data.map((da) => {
      if (da < amount.threeRanges[0].end) {
        amount.threeRanges[0].value++;
      }
      else if (da > amount.threeRanges[2].start) {
        amount.threeRanges[2].value++;
      }
      else {
        amount.threeRanges[1].value++;
      }
    })

    setSaleDetails(amount);

    console.log("amount", amount)
    console.log("itemCount", itemCountByProfit)
    console.log("deviveryDts", deliveryDts)
    console.log("itemCountByQuantity", itemCountByQuantity)

    setDeliveryDetails(deliveryDts)
    setBarChartData(itemCountByProfit)    

    var data1= itemCountByQuantity.sort((a, b) => b.totalQuantity - a.totalQuantity).slice(0, 5);
    console.log("data1",data1)
    setTop5SaleItems(data1)

    return itemCountByProfit;
  };

  const prepareCustomDetails = (orders) => {
    const itemCount = [];

    // Loop through each order and each item within the order
    orders.forEach(order => {
      var totalAmt = 0;
      order.Items.forEach(item => totalAmt += item.Item_Price)
      itemCount.push({
        name: order.Customer_Name,
        amount: totalAmt
      })
    });

    var data = itemCount.sort((a, b) => b.amount - a.amount).slice(0, 5);;

    setTopCustomer(data)
  };

  const getTop5Items = (data) => {
    // Sort by count in descending order and take the top 5
    var outData = data.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5);
    setTop5ProfitableItems(outData);
  };

  const getOrderTypeDetails = (data) => {
    var outData = [
      {
        id: 0,
        value: 0,
        label: "Online Sale"
      },
      {
        id: 1,
        value: 0,
        label: "DineIn Sale"
      }
    ]

    data.map((item) => {
      outData[0].value += item.online_amount
      outData[1].value += item.dineIn_amount
    })

    outData[0].value = outData[0].value.toFixed(2)
    outData[1].value = outData[1].value.toFixed(2)

    setOrderTypeData(outData);
  };


  return (
    <div className='dashboard-div'>      
      <FoodWidget top5Items={top5ProfitableItems} top5SaleItems={top5SaleItems}/>
      <CustomerWidget top5Customer={top5Customer} />
      <SalesWidget orderTypeData={orderTypeData} amountRanges={saleDetails.threeRanges} />
      <DeliveryWidget deliveryDetails={deliveryDetails} />
    </div>
  );
};

export default Dashboard;
