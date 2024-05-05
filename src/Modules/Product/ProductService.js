import { instance } from "../../Features/Network/ApiCall";

export async function AddProduct(data) {
  const response = await instance.post(`/`, data);
  return response.data;
}

export async function GetProduct(data) {
  //console.log(data,"datadatadatadata")
  const response = await instance.post(`/`, data);
  return response.data;
}
export async function GetProductById(id) {
  const response = await instance.get(`/${id}`);
  return response.data;
}
export async function GetCategory() {
  const response = await instance.get(`/category`);
  return response.data;
}
export async function GetUnit() {
  const response = await instance.get(`/master/unit`);
  return response.data;
}
export async function GetFilter() {
  const response = await instance.get(`/filter-data`);
  return response.data;
}
