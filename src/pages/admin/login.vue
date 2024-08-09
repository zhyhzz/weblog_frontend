<template>
  <div class="grid grid-cols-2 h-screen">
    <div class="col-span-2 order-2 md:col-span-1 md:order-1 bg-black">
      <div class="flex justify-center items-center h-full">
        <!-- 默认占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端） -->
        <div
          class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900"
        >
          <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
          <div class="flex justify-center items-center h-full flex-col">
            <h2 class="font-bold text-4xl mb-7 text-white">SHABADAK</h2>
            <p class="text-white">
              Spring Boot + Mybaits Plus + Vue 3.2 + Vite 4
            </p>
            <!-- 指定图片宽度为父级元素的 1/2 -->
            <img src="" class="w-1/2" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
      <!-- flex-col 用于指定子元素垂直排列 -->
      <div
        class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast"
      >
        <!-- 大标题，设置字体粗细、大小、下边距 -->
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
        <!-- 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 -->
        <div
          class="flex items-center justify-center mb-7 text-gray-400 space-x-2"
        >
          <!-- 左边横线，高度为 1px, 宽度为 16，背景色设置 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <!-- 右边横线 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 -->
        <el-form
          class="w-5/6 md:w-2/5"
          :rules="rules"
          :model="form"
          ref="formRef"
        >
          <el-form-item prop="username">
            <!-- 输入框组件 -->
            <el-input
              size="large"
              v-model="form.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <!-- 密码框组件 -->
            <el-input
              size="large"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              clearable
              show-password
            />
          </el-form-item>
          <el-form-item>
            <!-- 登录按钮，宽度设置为 100% -->
            <el-button
              class="w-full mt-2"
              size="large"
              type="primary"
              @click="onSubmit"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入 Element Plus 中的用户、锁图标
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { login } from "@/api/admin/user";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { showMessage } from "@/composables/util";
import { setToken } from "@/composables/cookie";
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const router = useRouter();

// 定义响应式的表单对象
const form = reactive({
  username: "",
  password: "",
});

const formRef = ref(null);

const rules = reactive({
  username: [
    {
      required: true,
      message: "Please input username",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input password",
      trigger: "blur",
    },
  ],
});
const loading = ref(false);

// 登录
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;

      login(form.username, form.password)
        .then((res) => {
          if (res.success == true) {
            showMessage("登陆成功");
            //存储token到cookie中
            setToken(res.data.token);
            // 获取用户信息，并存储到全局状态中
            userStore.setUserInfo();
            //跳转到后台首页
            router.push("/admin/index");
          } else {
            showMessage(res.message, "error");
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

//按回车键后，执行登录
function onKeyUp(e) {
  if (e.key == "Enter") {
    onSubmit();
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>
