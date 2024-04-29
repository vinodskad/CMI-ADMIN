import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ToastAlert from "../../Component/Alert/ToastAlert";
import { AddProduct, GetProduct, GetProductById } from "./ProductService";
// import swal from "sweetalert";

const initialState = {
  addData: undefined,
  getData: undefined,
  getDataById:undefined,
  error: undefined,
  status: "idle"
};

export const AddProductData = createAsyncThunk(
  "Product/AddProduct",
  async (data) => {
    const response = await AddProduct(data);
    return response;
  }
);

export const GetProductData = createAsyncThunk(
  "Product/GetProduct",
  async () => {
    const response = await GetProduct();
    return response;
  }
);
export const GetProductByIdData = createAsyncThunk(
  "Product/GetProductById",
  async (id) => {
    const response = await GetProductById(id);
    return response;
  }
);

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(AddProductData.fulfilled, (state, action) => {
        state.status = "success";
        state.addData = action.payload;
        ToastAlert(action.payload.message, "success");
      })

      .addCase(GetProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetProductData.fulfilled, (state, action) => {
        state.status = "success";
        state.getData = action.payload;
      })

      .addCase(GetProductByIdData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetProductByIdData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetProductByIdData.fulfilled, (state, action) => {
        state.status = "success";
        state.getDataById = action.payload;
      });
  }
});

export const {} = ProductSlice.actions;

export const ProductData = (state) => {
  return state.product;
};

export const productReducer = ProductSlice.reducer;
