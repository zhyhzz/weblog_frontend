/**
 * @Author       : zuohy
 * @Date         : 2024-08-02 09:35:13
 * @LastEditTime : 2024-08-02 09:35:22
 * @LastEditors  : zuohy
 * @Description  : 用户相关的接口
*/
import axios from "@/axios";

// 登录接口
export function login(username, password) {
    return axios.post("/login", {username, password})
}