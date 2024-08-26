/**
 * @Author       : zuohy
 * @Date         : 2024-08-26 17:06:27
 * @LastEditTime : 2024-08-26 17:06:34
 * @LastEditors  : zuohy
 * @Description  : 
*/
import axios from "@/axios";

// 获取分类列表
export function getTagList(data) {
    return axios.get("/tag/list", data)
}