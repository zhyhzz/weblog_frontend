/**
 * @Author       : zuohy
 * @Date         : 2024-08-09 16:52:37
 * @LastEditTime : 2024-08-12 10:42:19
 * @LastEditors  : zuohy
 * @Description  : 用户信息
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfo } from "@/api/admin/user";
import { removeToken } from "@/composables/cookie"

export const useUserStore = defineStore(
  "user",
  () => {
    // 用户信息
    const userInfo = ref({});

    // 设置用户信息
    function setUserInfo() {
      // 调用后头获取用户信息接口
      getUserInfo().then((res) => {
        if (res.success == true) {
          userInfo.value = res.data;
          console.log(userInfo.value.username)
        }
      });
    }

    function logout() {
      removeToken();
      userInfo.value = {};
    }
    return { userInfo, setUserInfo, logout };
  },
  {
    persist: true,
  }
);
