/**
 * @Author       : zuohy
 * @Date         : 2024-08-02 14:59:25
 * @LastEditTime : 2024-08-02 15:02:52
 * @LastEditors  : zuohy
 * @Description  : 封装和令牌相关的 cookie 操作
*/
import { useCookies } from '@vueuse/integrations/useCookies'

//存储在cookie中的token的key
const TOKEN_KEY = 'Authorization';
const cookie = useCookies();

//获取token值
export function getToken() {
    return cookie.get(TOKEN_KEY);
}

//设置token到cookie中
export function setToken(token) {
    return cookie.set(TOKEN_KEY, token);
}

//删除token
export function removeToken() {
    return cookie.remove(TOKEN_KEY);
}
