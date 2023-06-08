//api进行统一管理
import requests from "./ajax";

export const reqCategoryList = () => {
  //axios返回的结果是promise对象
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};
// 获取搜索模块数据 /list post {}
export const reqLogin = (params: any) => {
  return requests({ url: "/select", method: "post", data: params });
};
// 注册
export const reqRegister = (params: any) => {
  return requests({ url: "/insert", method: "post", data: params });
};
//获取商品
export const reqIteminfo = () => {
  return requests({ url: "/iteminfo", method: "get" });
};
// 删除商品
export const deleteIteminfo = (params: any) => {
  return requests({ url: "/deleteitem", method: "post", data: params });
};
// 修改商品
export const updateIteminfo = (params: any) => {
  return requests({ url: "/updateitem", method: "post", data: params });
};
//获取用户
export const reqUser = () => {
  return requests({ url: "/user", method: "get" });
};
// 删除用户
export const deleteUser = (params: any) => {
  return requests({ url: "/deleteuser", method: "post", data: params });
};
// 修改用户
export const updateUser = (params: any) => {
  return requests({ url: "/updateuser", method: "post", data: params });
};
