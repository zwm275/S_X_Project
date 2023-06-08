<template>
  <h2>商品</h2>
  <el-table :data="data.tableData" height="530" stripe style="width: 100%">
    <el-table-column fixed prop="userid" label="发布人" width="160" />
    <el-table-column prop="title" label="商品标题" width="220" />
    <el-table-column prop="kind" label="商品类型" width="180" />
    <el-table-column prop="info" label="商品信息" width="410" />
    <el-table-column prop="price" label="商品价格" width="200" />
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
  <el-dialog v-model="dialogFormVisible" title="商品">
    <el-form :model="data.form">
      <el-form-item label="发布人：" :label-width="formLabelWidth">
        <el-input v-model="data.form.userid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品标题：" :label-width="formLabelWidth">
        <el-input v-model="data.form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品类型：" :label-width="formLabelWidth">
        <el-select v-model="data.form.kind" placeholder="请选择">
          <el-option label="生活用品" value="生活用品" />
          <el-option label="体育用品" value="体育用品" />
          <el-option label="学习用品" value="学习用品" />
          <el-option label="电子产品" value="电子产品" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品信息：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="data.form.info" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价格：" :label-width="formLabelWidth">
        <el-input v-model="data.form.price" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editItem(data.form)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reqIteminfo, deleteIteminfo, updateIteminfo } from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

// 获取所有信息
const getAllIteminfo = async () => {
  let result: never[] = await reqIteminfo()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  data.tableData = [...result];
};
onMounted(() => getAllIteminfo());

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
const editItem = async (form: any) => {
  dialogFormVisible.value = false;
  let result = await updateIteminfo(form)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  if (result.affectedRows === 1) {
    open2("修改");
    getAllIteminfo();
  } else {
    open4("修改");
  }
};
// 删除商品
const deleteItem = async (row: any) => {
  let result = await deleteIteminfo(row)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  if (result.affectedRows === 1) {
    open2("删除");
    getAllIteminfo();
  } else {
    open4("删除");
  }
};

const data = reactive({
  tableData: [],
  form: {
    userid: "",
    title: "",
    kind: "",
    info: "",
    price: 0,
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
