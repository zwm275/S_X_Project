<template>
  <h2>用户</h2>
  <el-table :data="data.tableData" height="530" stripe style="width: 100%">
    <el-table-column fixed prop="name" label="用户名" width="270" />
    <el-table-column prop="account" label="用户账号" width="300" />
    <el-table-column prop="password" label="用户密码" width="300" />
    <el-table-column prop="identity" label="用户权限" width="300" />
    <el-table-column fixed="right" label="选项" width="120">
      <template v-slot="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="showDialog(scope.row)"
          >编辑</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="deleteItem(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button class="nosee" :plain="true" @click="open2">success</el-button>
  <el-button class="nosee" :plain="true" @click="open4">error</el-button>
  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" title="用户">
    <el-form :model="data.form">
      <el-form-item label="姓名：" :label-width="formLabelWidth">
        <el-input v-model="data.form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号：" :label-width="formLabelWidth">
        <el-input v-model="data.form.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth">
        <el-input v-model="data.form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户权限：" :label-width="formLabelWidth">
        <el-select v-model="data.form.identity" placeholder="请选择">
          <el-option label="管理员" value="1" />
          <el-option label="普通用户" value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editUser(data.form)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reqUser, deleteUser, updateUser } from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

// let userIdentity = ["普通用户", "管理员"];

// 获取所有信息
const getAllUser = async () => {
  let result: never[] = await reqUser()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  data.tableData = [...result];
  console.log(data.tableData);
};
onMounted(() => getAllUser());

// 对话框
let dialogFormVisible = ref(false);
const formLabelWidth = "140px";

//点击编辑按钮 弹出对话框
const showDialog = (row: any) => {
  data.form = { ...row };
  console.log(data.form);
  console.log(row);
  dialogFormVisible.value = true;
};
// 对话框里点击提交
const editUser = async (form: any) => {
  form.identity = Number(form.identity);
  dialogFormVisible.value = false;
  let result = await updateUser(form)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  if (result.affectedRows === 1) {
    open2("修改");
    getAllUser();
  } else {
    open4("修改");
  }
};
// 删除商品
const deleteItem = async (row: any) => {
  let result = await deleteUser(row)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  if (result.affectedRows === 1) {
    open2("删除");
    getAllUser();
  } else {
    open4("删除");
  }
};

const data = reactive({
  tableData: [],
  form: {
    name: "",
    account: "",
    password: "",
    identity: 0,
  },
});

// 弹窗
const open2 = (str: string) => {
  ElMessage({
    message: `${str}成功`,
    type: "success",
  });
};
const open4 = (str: string) => {
  ElMessage.error(`${str}失败`);
};
</script>

<style lang="scss" scoped>
.nosee {
  display: none;
}
</style>
