import { instance } from "../../Features/Network/ApiCall";

export async function AddProduct(data) {
  const response = await instance.post(`/product`, data);
  return response.data;
}

export async function GetProduct(data) {
  const response = await instance.post(`/`,data={
    "pageNo": 1,
    "pageSize": 10,
    "searchOn": "name",
    "searchValue": "",
    "filter": {
    }
});
  return response.data;
}
export async function GetProductById(id) {
  const response = await instance.get(`/${id}`);
  return response.data;
}
