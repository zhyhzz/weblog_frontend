/**
 * @Author       : zuohy
 * @Date         : 2024-08-20 15:06:01
 * @LastEditTime : 2024-08-22 15:40:30
 * @LastEditors  : zuohy
 * @Description  : 文章api
*/
import axios from "@/axios";

// 获取文章分页数据
export function getArticlePageList(data) {
    return axios.post("/admin/article/list", data)
}

export function delArticle(articleId) {
    return axios.post("/admin/article/delete", {articleId}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
}

// 发布文章
export function publishArticle(data) {
    return axios.post("/admin/article/add", data)
}