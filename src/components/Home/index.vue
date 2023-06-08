<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2>二手交易市场</h2>
        <el-button @click="$router.push('/login')">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="25">
            <h5 class="mb-2">选项</h5>
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="$router.push({ name: 'items' })">
                <el-icon><icon-menu /></el-icon>
                <span>商品管理</span>
              </el-menu-item>
              <el-menu-item index="2" @click="$router.push({ name: 'users' })">
                <el-icon><document /></el-icon>
                <span>用户管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.common-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
  .el-header {
    h2 {
      line-height: 100px;
      font-size: 40px;
      margin: 0;
    }
    .el-button {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 65px;
      margin-right: 4px;
    }
    height: 100px;
    background-color: #bce8e9;
  }
  .el-aside {
    width: 200px;
    .mb-2 {
      font-size: 16px;
    }
  }
  .el-main {
    background-color: #ffffff;
  }
}
</style>
