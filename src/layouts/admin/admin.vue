<!--
 * @Author       : zuohy
 * @Date         : 2024-08-05 09:16:17
 * @LastEditTime : 2024-08-22 09:39:16
 * @LastEditors  : zuohy
 * @Description  : 后台管理主布局
-->
<template>
  <!-- 外层容器 -->
  <el-container>
    <!-- 左边侧边栏 -->
    <el-aside :width="menuStore.menuWidth" class="transition-all duration-100">
      <AdminMenu></AdminMenu>
    </el-aside>

    <!-- 主容器 -->
    <el-container>
      <!-- 顶栏容器 -->
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>

      <el-main>
        <!-- 标签导航栏 -->
        <AdminTagList></AdminTagList>

        <!-- 主内容（根据路由动态展示不同页面） -->
        <router-view v-slot="{ Component }">
            <!-- max 指定最多缓存 10 个组件 -->
            <KeepAlive :max="10">
              <component :is="Component"></component>
            </KeepAlive>
        </router-view>
      </el-main>

      <!-- 底栏容器 -->
      <el-footer>
        <AdminFooter></AdminFooter>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
// 引入组件
import AdminFooter from "./components/AdminFooter.vue";
import AdminHeader from "./components/AdminHeader.vue";
import AdminMenu from "./components/AdminMenu.vue";
import AdminTagList from "./components/AdminTagList.vue";

import { useMenuStore } from "@/stores/menu";

const menuStore = useMenuStore();
</script>

<style scoped>
.el-header {
  padding: 0 !important;
}

.el-footer {
  padding: 0 !important;
}

/* 内容区域过渡动画：淡入淡出效果 */
/* 刚开始进入时 */
.fade-enter-from {
  /* 透明度 */
  opacity: 0;
}

/* 刚开始结束 */
.fade-enter-to {
  opacity: 1;
}

/* 刚开始离开 */
.fade-leave-from {
  opacity: 1;
}

/* 离开已结束 */
.fade-leave-to {
  opacity: 0;
}

/* 离开进行中 */
.fade-leave-active {
  transition: all 0.3s;
}

/* 进入进行中 */
.fade-enter-active {
  transition: all 0.3s;
  transition-delay: 0.3s;
}
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
</style>
