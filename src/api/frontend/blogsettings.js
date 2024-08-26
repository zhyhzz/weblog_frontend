/**
 * @Author       : zuohy
 * @Date         : 2024-08-26 14:12:48
 * @LastEditTime : 2024-08-26 14:12:48
 * @LastEditors  : zuohy
 * @Description  : 博客设置
*/
import axios from "@/axios";

// 获取博客设置详情
export function getBlogSettingsDetail() {
    return axios.post("/blog/settings/detail")
}