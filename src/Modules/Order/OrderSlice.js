import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ToastAlert from "../../Component/Alert/ToastAlert";
import { AddOrder, GetOrder } from "./OrderService";
// import swal from "sweetalert";

const initialState = {
  addData: undefined,
  getData: undefined,
  error: undefined,
  status: "idle"
};

export const AddOrderData = createAsyncThunk(
  "Order/AddOrder",
  async (data) => {
    const response = await AddOrder(data);
    return response;
  }
);

export const GetOrderData = createAsyncThunk(
  "Order/GetOrder",
  async () => {
    const response = await GetOrder();
    return response;
  }
);

export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddOrderData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddOrderData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(AddOrderData.fulfilled, (state, action) => {
        state.status = "success";
        state.addData = action.payload;
        ToastAlert(action.payload.message, "success");
      })

      .addCase(GetOrderData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetOrderData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetOrderData.fulfilled, (state, action) => {
        state.status = "success";
        state.getData = action.payload;
      });
  }
});

export const {} = OrderSlice.actions;

export const OrderData = (state) => {
  return state.order;
};

export const orderReducer = OrderSlice.reducer;
