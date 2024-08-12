<!--
 * @Author       : zuohy
 * @Date         : 2024-08-05 09:21:17
 * @LastEditTime : 2024-08-12 10:45:01
 * @LastEditors  : zuohy
 * @Description  : 头部 Header
-->
<template>
  <!-- 通过 flex 指定水平布局 -->
  <div class="bg-white h-[64px] flex pr-4 border-b border-slate-200">
    <!-- 左边栏收缩、展开 -->
    <div
      class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
      @click="handleMenuWidth"
    >
      <el-icon>
        <Fold v-if="menuStore.menuWidth == '250px'" />
        <Expand v-else />
      </el-icon>
    </div>

    <!-- 右边容器，通过 ml-auto 让其在父容器的右边 -->
    <div class="ml-auto flex">
      <!-- 点击刷新页面 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
      >
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
          @click="handleRefresh"
        >
          <el-icon>
            <Refresh />
          </el-icon>
        </div>
      </el-tooltip>
      <!-- 点击全屏展示 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200"
          @click="toggle"
        >
          <el-icon>
            <FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </div>
      </el-tooltip>
      <!-- 登录用户头像 -->
      <el-dropdown
        class="flex items-center justify-center"
        @command="handleCommand"
      >
        <span
          class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs"
        >
          <!-- 头像 Avatar -->
          <el-avatar
            class="mr-2"
            :size="25"
            src="https://img.quanxiaoha.com/quanxiaoha/f97361c0429d4bb1bc276ab835843065.jpg"
          />
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="updatePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 修改密码 -->
  <el-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="40%"
    :draggable="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="用户名" prop="username" label-width="120px">
        <!-- 输入框组件 -->
        <el-input
          size="large"
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.rePassword"
          placeholder="请确认密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useMenuStore } from "@/stores/menu";
import { useFullscreen } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import { ref, reactive, watch } from "vue";
import { showMessage } from "@/composables/util";
import { useRouter } from "vue-router";
import { updateAdminPassword } from "@/api/admin/user";

// 引入了用户 Store
const userStore = useUserStore();
const menuStore = useMenuStore();
const dialogVisible = ref(false);

// 引入路由
const router = useRouter();

// 表单引用
const formRef = ref(null);
const form = reactive({
  username: userStore.userInfo.username || "",
  password: "",
  rePassword: "",
});

//监听pinia store中的某个值的变化
watch(() => userStore.userInfo.username, (newValue, oldValue) => {
  form.username = newValue;
})

const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
  rePassword: [
    {
      required: true,
      message: "确认密码不能为空",
      trigger: "blur",
    },
  ],
};
const handleMenuWidth = () => {
  menuStore.handleMenuWidth();
};

const { isFullscreen, toggle } = useFullscreen();

const handleRefresh = () => location.reload();

const handleCommand = (command) => {
  if (command === "updatePassword") {
    dialogVisible.value = true;
  } else {
    userStore.logout();
    router.push("/login");
  }
};

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log("表单验证不通过");
      return false;
    }
    if (form.password != form.rePassword) {
      showMessage("两次密码输入不一致，请检查");
      return;
    }
    updateAdminPassword(form).then((res) => {
      if (res.success == true) {
        showMessage("密码重置成功，请重新登录");
        userStore.logout();

        dialogVisible.value = false;

        router.push("/login");
      } else {
        // 获取服务端返回的错误消息
        let message = res.message;
        // 提示消息
        showMessage(message, "error");
      }
    });
  });
};
function logout() {}
</script>
