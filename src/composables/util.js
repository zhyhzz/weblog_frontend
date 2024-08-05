/**
 * @Author       : zuohy
 * @Date         : 2024-08-02 11:22:21
 * @LastEditTime : 2024-08-02 11:23:53
 * @LastEditors  : zuohy
 * @Description  : 封装工具类
*/
import nprogress from "nprogress"

export function showMessage(message="提示内容", type="success", customClass = "") {
    return ElMessage({
        type: type,
        message,
        customClass
    })
}

// 显示页面加载 Loading
export function showPageLoading() {
    nprogress.start()
}

// 隐藏页面加载 Loading
export function hidePageLoading() {
    nprogress.done()
}