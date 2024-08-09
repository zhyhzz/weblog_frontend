/**
 * @Author       : zuohy
 * @Date         : 2024-08-01 17:23:01
 * @LastEditTime : 2024-08-09 10:31:56
 * @LastEditors  : zuohy
 * @Description  :
 */
import axios from "axios";
import { getToken } from "@/composables/cookie";
import { showMessage} from '@/composables/util';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: "/api", // 你的 API 基础 URL
  timeout: 7000, // 请求超时时间
});

//添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    console.log("统一添加请求头中的 Token:" + token);

    // 当 token 不为空时
    if (token) {
      // 添加请求头, key 为 Authorization，value 值的前缀为 'Bearer '
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    //在发送请求前todo
    return response.data;
  },
  function (error) {
    let errorMsg = error.response.data.message || '请求失败'
    // 弹错误提示
    showMessage(errorMsg, 'error');
    return Promise.reject(error);
  }
);

// 暴露出去
export default instance;
