<template>
  <!-- 设置语言为中文 -->
  <el-config-provider :locale="locale">
     <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
</script>

<style>
html,body,#app{
  margin: 0;
  padding: 0;
  height:100%;
}
</style>