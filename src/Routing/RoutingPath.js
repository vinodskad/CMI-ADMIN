import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import AdminLayout from "../Layout/AdminLayout";
import Login from "../Modules/Auth/Login";
import ProductList from "../Modules/Product/ProductList";
import OrderListPage from "../Modules/Order/OrderList";
import ProductDetails from "../Modules/Product/ProductDetails";

const RoutingPath = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />}></Route>
      </Route>
      <Route path="/cmi" element={<AdminLayout />}>
        <Route index element={<ProductList />}></Route>
        <Route  path="/cmi/order" element={<OrderListPage />}></Route>
        <Route  path="/cmi/productDetails/:id" element={<ProductDetails/>}/>
      </Route>
    </Routes>
  );
};

export default RoutingPath;
