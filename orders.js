import {orders} from './ordersdata.js'

// Get List of Customers
const customers = [...new Set(orders.map(order => order.Customer_Name))];

// Get Each Item Order Count
const itemOrderCount = {};
orders.forEach(order => {
  order.Items.forEach(item => {
    itemOrderCount[item.Item_Name] = (itemOrderCount[item.Item_Name] || 0) + item.Quantity;
  });
});

// Get Top Selling Item
const topSellingItem = Object.keys(itemOrderCount).reduce((topItem, currentItem) => {
  return itemOrderCount[currentItem] > (itemOrderCount[topItem] || 0) ? currentItem : topItem;
}, "");

// Get Average Customer Order Price
const totalRevenue = orders.reduce((sum, order) => {
  return sum + order.Items.reduce((itemSum, item) => itemSum + item.Total_Price, 0);
}, 0);
const averageOrderPrice = (totalRevenue / orders.length).toFixed(2);

// Get Total Delivery Persons and Their Order Status
const deliveryDetails = {};
orders.forEach(order => {
  if (!deliveryDetails[order.Delivery_Person]) {
    deliveryDetails[order.Delivery_Person] = {
      totalOrders: 0,
      statusCount: {}
    };
  }
  deliveryDetails[order.Delivery_Person].totalOrders++;
  deliveryDetails[order.Delivery_Person].statusCount[order.Delivery_Status] = 
    (deliveryDetails[order.Delivery_Person].statusCount[order.Delivery_Status] || 0) + 1;
});

// Get Order Type Count
const orderTypeCount = orders.reduce((count, order) => {
  count[order.Order_Type] = (count[order.Order_Type] || 0) + 1;
  return count;
}, {});

// Display Results
console.log("List of Customers:", customers);
console.log("Each Item Order Count:", itemOrderCount);
console.log("Top Selling Item:", topSellingItem);
console.log("Average Customer Order Price:", averageOrderPrice);
console.log("Total Delivery Persons and Order Status:", deliveryDetails);
console.log("Order Type Count:", orderTypeCount);
