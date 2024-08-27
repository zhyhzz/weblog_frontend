/**
 * @Author       : zuohy
 * @Date         : 2024-08-26 14:44:29
 * @LastEditTime : 2024-08-27 15:24:42
 * @LastEditors  : zuohy
 * @Description  : 文章api
*/
import axios from "@/axios";

// 获取文章分页数据
export function getArticlePageList(data) {
    return axios.post("article/list", data)
}

// 获取文章详情
export function getArticleDetail(articleId) {
    return axios.post("/article/detail", {articleId}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
}