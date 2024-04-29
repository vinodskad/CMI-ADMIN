import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { GetOrderData, OrderData } from './OrderSlice';
import OrderListItem from './OrderListItem';
const OrderList = () => {
 // State to hold your orders data
 const dispatch = useDispatch();

// Function to group orders by creation date
const orders = useSelector(OrderData)?.getData;
//const [orderList, setOrderList]=useState(orders)
console.log(useSelector(OrderData)?.getData,"useSelector(OrderData)?.getData")
useEffect(()=>{
    if(orders){
        console.log(orders,"ordersordersordersordersorders")
    }
},[orders])

function groupOrdersByDate(orders) {
    console.log(orders,"ordersorders")
    const groupedOrders = {};

    orders?.forEach(order => {
        const date = order.createdOn.split("T")[0]; // Extracting date part
        if (!groupedOrders[date]) {
            groupedOrders[date] = [];
        }
        groupedOrders[date].push({
            orderId: order.orderId,
            status: order.status,
            customerName:order.customerName
        });
    });

    // Convert object to array
    const result = Object.keys(groupedOrders).map(date => ({
        createdOn: date,
        order: groupedOrders[date]
    }));

    return result;
}
const groupedOrders = groupOrdersByDate(orders);
 // Mock data (replace with actual API call)
 useEffect(() => {
    dispatch(GetOrderData()); 
  }, []);

 return (
   <>
   <Typography className="pageHeader">Order List</Typography>
   <Card>
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid sm={12}>
            <OrderListItem ordersList={groupedOrders}/>
        </Grid>
      </Grid>
    </Card>
   </>
 );

}

export default OrderList