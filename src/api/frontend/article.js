/**
 * @Author       : zuohy
 * @Date         : 2024-08-26 14:44:29
 * @LastEditTime : 2024-08-26 14:44:37
 * @LastEditors  : zuohy
 * @Description  : 文章api
*/
import axios from "@/axios";

// 获取文章分页数据
export function getArticlePageList(data) {
    return axios.post("article/list", data)
}
