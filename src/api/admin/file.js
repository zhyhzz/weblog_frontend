/**
 * @Author       : zuohy
 * @Date         : 2024-08-19 09:18:04
 * @LastEditTime : 2024-08-19 09:18:04
 * @LastEditors  : zuohy
 * @Description  : 文件相关
*/
import axios from "@/axios";

// 上传文件
export function uploadFile(form) {
    return axios.post("/admin/file/upload", form)
}