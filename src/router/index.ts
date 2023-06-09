import {
  createRouter,
  createWebHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { useMainStore } from "../store/index"; // 仓库
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    // name: "login",
    component: () => import("@/components/Login.vue"),
    // props: true,
    // props($route) {
    //   return {
    //     msg: $route.query.msg,
    //     name: $route.query.name,
    //   };
    // },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/Register.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/components/Home/index.vue"),
    children: [
      //通过children配置子级路由
      {
        path: "", //此处一定不要写：/news
        name: "items",
        component: () => import("@/components/Home/ItemManagement.vue"),
      },
      {
        path: "items",
        name: "items",
        component: () => import("@/components/Home/ItemManagement.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/components/Home/UserManagement.vue"),
      },
    ],
  },
  //   { path: "/my", name: "My", component: () => import("@/views/My.vue") },
];

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHistory(),
  routes,
};

// Router是路由对象类型
const router: Router = createRouter(options);

// 前置路由守卫
router.beforeEach((to, _from, next) => {
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    const mainStore = useMainStore();
    if (mainStore.account !== "") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
