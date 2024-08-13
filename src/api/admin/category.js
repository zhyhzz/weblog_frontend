import axios from "@/axios";

export function listCategory(data) {
    return axios.post("/admin/category/list", data)
}

export function addCategory(data) {
    return axios.post("/admin/category/add", data)
}

export function deleteCategory(id) {
    return axios.post("/admin/category/delete", {id}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
}