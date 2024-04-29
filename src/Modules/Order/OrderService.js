import { instance } from "../../Features/Network/ApiCall";

export async function AddOrder(data) {
  const response = await instance.post(`/Order`, data);
  return response.data;
}

export async function GetOrder() {
  const response = await instance.get(`/order`);
  return response.data;
}
