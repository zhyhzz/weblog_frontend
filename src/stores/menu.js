/**
 * @Author       : zuohy
 * @Date         : 2024-08-05 16:55:41
 * @LastEditTime : 2024-08-09 17:19:24
 * @LastEditors  : zuohy
 * @Description  : 声明菜单相关的全局状态
*/
import { defineStore } from "pinia"
import { ref } from "vue"

export const useMenuStore = defineStore('menu', ()=> {
    const menuWidth = ref("250px");

    function handleMenuWidth() {
        menuWidth.value = menuWidth.value === "250px"? "64px": "250px";
    }

    return { menuWidth, handleMenuWidth }
}, 
{
  // 开启持久化
  persist: true,
})
