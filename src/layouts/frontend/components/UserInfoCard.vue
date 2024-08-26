<!--
 * @Author       : zuohy
 * @Date         : 2024-08-26 16:31:35
 * @LastEditTime : 2024-08-26 16:33:59
 * @LastEditors  : zuohy
 * @Description  : 用户信息
-->
<template>
    <div class="w-full py-5 px-2 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center">
            <!-- 博主头像 -->
            <img class="w-15 h-15 mb-3 rounded-full shadow"
                :src="blogSettingsStore.blogSettings.avatar"/>
            <!-- 博主昵称 -->
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ blogSettingsStore.blogSettings.author }}</h5>
            <!-- 介绍语 -->
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ blogSettingsStore.blogSettings.introduction }}</span>
            <!-- 第三方平台主页跳转（如 GitHub 等） -->
            <div class="flex justify-center mt-5 gap-2">
                <!-- GitHub -->
                <svg v-if="blogSettingsStore.blogSettings.githubHomepage" t="1698029949662" data-tooltip-target="github-tooltip-bottom" data-tooltip-placement="bottom"
                    class="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1447" width="200" height="200">
                    <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#4186F5" p-id="1448"></path>
                    <path
                        d="M611.944 302.056c0-15.701 2.75-30.802 7.816-44.917a384.238 384.238 0 0 0-186.11 2.956c-74.501-50.063-93.407-71.902-107.975-39.618a136.243 136.243 0 0 0-3.961 102.287 149.515 149.515 0 0 0-39.949 104.806c0 148.743 92.139 181.875 179.961 191.61a83.898 83.898 0 0 0-25.192 51.863c-40.708 22.518-91.94 8.261-115.181-32.058a83.117 83.117 0 0 0-60.466-39.98s-38.871-0.361-2.879 23.408a102.97 102.97 0 0 1 43.912 56.906s23.398 75.279 133.531 51.863v65.913c0 10.443 13.548 42.63 102.328 42.63 71.275 0 94.913-30.385 94.913-42.987V690.485a90.052 90.052 0 0 0-26.996-72.03c83.996-9.381 173.328-40.204 179.6-176.098a164.706 164.706 0 0 1-21.129 1.365c-84.07 0-152.223-63.426-152.223-141.666z"
                        fill="#FFFFFF" p-id="1449"></path>
                    <path
                        d="M743.554 322.765a136.267 136.267 0 0 0-3.961-102.289s-32.396-10.445-107.979 39.618a385.536 385.536 0 0 0-11.853-2.956 132.623 132.623 0 0 0-7.816 44.917c0 78.24 68.152 141.667 152.222 141.667 7.171 0 14.222-0.472 21.129-1.365 0.231-5.03 0.363-10.187 0.363-15.509a149.534 149.534 0 0 0-42.105-104.083z"
                        fill="#FFFFFF" opacity=".4" p-id="1450"></path>
                        @click="jump(blogSettingsStore.blogSettings.githubHomepage)"     
                </svg>
                <div id="github-tooltip-bottom" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    我的 GitHub
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBlogSettingsStore } from '@/stores/blogsettings'
import { initTooltips } from 'flowbite'
import { onMounted } from 'vue'

// 初始化 Flowbit 组件
onMounted(() => {
    initTooltips();
})
const jump = (url) => {
    // 在新窗口访问新的链接地址
    window.open(url, '_blank');
} 
// 引入博客设置信息 store
const blogSettingsStore = useBlogSettingsStore()
</script>

