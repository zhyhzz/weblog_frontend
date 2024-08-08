<!--
 * @Author       : zuohy
 * @Date         : 2024-08-05 09:22:09
 * @LastEditTime : 2024-08-08 16:19:10
 * @LastEditors  : zuohy
 * @Description  : 标签导航
-->
<template>
    <!-- 左边：标签导航栏 -->
    <div class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white flex transition-all duration-100 shadow" :style="{left: menuStore.menuWidth}">
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab" style="min-width: 10px;">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :closable="item.path != '/admin/index'">
            
            </el-tab-pane>
        </el-tabs>
         <!-- 右侧下拉菜单 -->
         <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
            <el-dropdown class="flex items-center justify-center">
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>关闭其他</el-dropdown-item>
                        <el-dropdown-item>关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div class="h-[44px]"></div>
</template>

<script setup>
import { ref } from "vue";
import { useMenuStore } from '@/stores/menu'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const menuStore = useMenuStore()

// 当前被选中的 tab
const activeTab = ref(route.path)

const tabList = ref([
    {
        title: '仪表盘',
        path: "/admin/index"
    },
   
])

//在路由切换前被调用
onBeforeRouteUpdate((to, from)=> {
    // 设置被激活的 Tab 标签
    activeTab.value = to.path
    // 添加 Tab 标签页
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

function addTab(tab){
      // 标签是否不存在
      let isTabNotExisted = tabList.value.findIndex(item => item.path == tab.path) == -1
    // 如果不存在
    if (isTabNotExisted) {
        // 添加标签
        tabList.value.push(tab)
    }
}

const removeTab = (targetName) => {
    const tabs = tabList.value;
    let activeName = activeTab.value;
    if(activeName == targetName) {
        tabs.forEach((tab, index) => {
            if(tab.path === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1] ;
                if(nextTab) {
                    activeName = nextTab.path;
                }
            }
        })
    }
    activeTab.value = activeName
    tabList.value = tabs.filter((tab) => tab.path !== targetName)
}
</script>

<style>
.el-tabs__item {
    font-size: 12px;
    border: 1px solid #d8dce5!important;
    border-radius: 3px!important;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
    margin-left: 0.1rem!important;
    margin-right: 0.1rem!important;
}

.el-tabs__item.is-active {
    background-color: var(--el-color-primary)!important;
    color: #fff;
}

.el-tabs__item.is-active::before {
    content: "";
    background-color: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 4px;
}

.el-tabs {
    height: 32px;
}

.el-tabs__header {
    margin-bottom: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
    height: 32px;
    line-height: 32px;
    border: 0;
    background: #fff;
}

.el-tabs--card>.el-tabs__header {
    border: 0;
}

.el-tabs__nav-prev, .el-tabs__nav-next {
    line-height: 35px;
}

.is-disabled {
    cursor: not-allowed;
    color: #d1d5db;
}

</style>
