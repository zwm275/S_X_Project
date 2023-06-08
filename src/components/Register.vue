<template>
  <div class="box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      ><h1>register</h1>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
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
          >注册</el-button
        >
        <el-button type="primary" @click="toLogin()">去登录</el-button>
      </el-form-item>
      <el-text class="mx-1" :style="style" type="success">{{ tip }}</el-text>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { reactive, ref } from "vue";
import { reqRegister } from "@/api/index";

const ruleFormRef = ref();

let tip = ref("用户已存在");

const ruleForm = reactive({
  name: "",
  account: "",
  password: "",
});

let style = reactive({
  display: "none",
  color: "#f56c6c",
});

const rules = reactive({
  name: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 12, message: "姓名长度在 4 - 12 之间", trigger: "blur" },
  ],
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 12, message: "账号长度在 4 - 12 之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 12, message: "密码长度在 4 - 12 之间", trigger: "blur" },
  ],
});

const submitForm = (formEl: any) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      let result = await reqRegister(ruleForm)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      // result.length == 1 ? router.push("/home") : changeStyle();

      if (result !== "err") {
        // 注册成功
        console.log(1);
        changeStyle(true);
      } else {
        // 注册失败
        console.log(2);
        changeStyle(false);
      }
    } else {
      //   console.log("error submit!");
      return false;
    }
  });
};
const toLogin = () => {
  router.push("/login");
};

const changeStyle = (flag: boolean) => {
  if (flag) {
    // 注册成功的的回调
    style.display = "block";
    style.color = "#67c23a";
    tip.value = "注册成功";
    const timer = setTimeout(() => {
      style.display = "none";
      clearTimeout(timer);
    }, 5000);
  } else {
    // 注册失败的的回调
    style.display = "block";
    style.color = "#f56c6c";
    tip.value = "用户已存在";
    const timer = setTimeout(() => {
      style.display = "none";
      clearTimeout(timer);
    }, 5000);
  }
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
  font-size: 14px;
}
</style>
