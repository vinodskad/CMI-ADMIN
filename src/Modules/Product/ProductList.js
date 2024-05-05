import { Box, Dialog, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableList from "../../Component/Table/List";
import {
  AddProductData,
  ProductData,
  GetProductData,
} from "./ProductSlice";
import { ProductListConfig } from './ProductListConfig'


const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(ProductData)?.getData;
  const [apiParam, setApiParam] = useState({
    pageNo: 1,
    pageSize: 10,
    searchOn: "name",
    searchValue: "",
    filter: {
    }
  });
  const [formFeild, setFormFeild] = useState();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [recordId, setRecordId] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  useEffect(() => {
    if (apiParam) {
      //console.log(apiParam,"apiParamapiParam")
      dispatch(GetProductData(apiParam));
    }
    // Safe to add dispatch to the dependencies array
  }, [apiParam]);
  const handleAdd = () => {
    window.location.assign('/cmi/addProduct')
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (rowData) => {
    setOpen(true);
    setRecordId(rowData?.id);
    setName(rowData?.name);
    setModalHeader("Edit Amenties");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recordId) {
      var data = {
        name: name,
        id: recordId,
      };
    } else {
      var data = {
        name: name,
      };
    }
    await dispatch(AddProductData(data));
    //await dispatch(GetProductData(apiParam));
    setOpen(false);
  };
  const handleView = (id) => {
    window.location.assign(`/cmi/productDetails/${id}`)
  }
  return (
    <>
      <Typography className="pageHeader">Product List</Typography>
      {/* <AddProjectDialog/> */}
      <TableList
        data={productList?.data}
        meta={ProductListConfig["products"]}
        totalItems={productList?.totalItem}
        setApiParam={setApiParam}
        buttonLabel="Add Product"
        pageHeader={"Product List"}
        handleSubmit={handleSubmit}
        setFormFeild={setFormFeild}
        showAdd={true}
        onAdd={handleAdd}
        onEdit={handleEdit}
        handleView={handleView}
      />

    </>
  );
};

export default ProductList;
