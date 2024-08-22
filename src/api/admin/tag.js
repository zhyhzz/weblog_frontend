import axios from "@/axios";

export function listTags(data) {
    return axios.post("/admin/tag/list", data)
}

export function addTag(name) {
    return axios.post("/admin/tag/add", {name}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
}

export function deleteTag(id) {
    return axios.post("/admin/category/delete", {id}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
}

export function searchTag(name) {
    return axios.post("/admin/tag/search", {name}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
}