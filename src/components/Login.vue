<template>
  <div class="box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      ><h1>login</h1>
      <el-form-item label="用户名:" prop="account">
        <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button type="primary" @click="toRegister()">去注册</el-button>
        <el-button type="primary" @click="toLogin()">我是超管开门</el-button>
      </el-form-item>
      <el-text class="mx-1" :style="style" type="danger">账号密码错误</el-text>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { reactive, ref } from "vue";
import { reqLogin } from "@/api/index";
import { useMainStore } from "../store/index";

const ruleFormRef = ref();

let style = reactive({
  display: "none",
});

const ruleForm = reactive({
  account: "",
  password: "",
});

const rules = reactive({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 12, message: "账号长度在 4 - 12 之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 12, message: "密码长度在 4 - 12 之间", trigger: "blur" },
  ],
});

const toLogin = () => {
  router.push("/home");
};

const mainStore = useMainStore();
// 登录
const submitForm = (formEl: any) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      const result = await reqLogin(ruleForm)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      if (result.length == 1) {
        mainStore.account = ruleForm.account;
        console.log(mainStore.account, ruleForm.account);
        router.push("/home");
      } else {
        changeStyle();
      }
    } else {
      //   console.log("error submit!");
      return false;
    }
  });
};
const changeStyle = () => {
  style.display = "block";
  const timer = setTimeout(() => {
    style.display = "none";
    clearTimeout(timer);
  }, 5000);
};
const toRegister = () => {
  router.push("/register");
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  background-image: linear-gradient(to right top, #a8edea 0%, #fed6e3 100%);
}
h1 {
  padding-top: 10px;
}
.demo-ruleForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // padding-right: 100px;
  // padding: 0 50px 30px 0;
  width: 400px;
}

.el-form-item {
  margin-bottom: 25px;
}
.mx-1 {
  position: absolute;
  margin-left: 120px;
  // top: 290;
  // left: 140;
  font-size: 14px;
}
</style>
