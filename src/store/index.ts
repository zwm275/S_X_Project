// 引入
import { defineStore } from "pinia";

// 1. 定义容器
export const useMainStore = defineStore("main", {
  state: () => {
    return {
      account: "",
    };
  },
  getters: {},
  actions: {},
});
