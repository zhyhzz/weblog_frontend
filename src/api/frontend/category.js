/**
 * @Author       : zuohy
 * @Date         : 2024-08-26 16:57:16
 * @LastEditTime : 2024-08-26 16:57:24
 * @LastEditors  : zuohy
 * @Description  : 
*/
import axios from "@/axios";

// 获取分类列表
export function getCategoryList(data) {
    return axios.get("/category/list", data)
}