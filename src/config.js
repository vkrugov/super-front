import axios from 'axios'
import toastr from "toastr";

toastr.options.closeButton = true;
toastr.options.positionClass = 'toast-top-center';

const api = axios.create({
    baseURL: 'http://127.0.0.1:1580/api/',
    timeout: 10000,
    params: {}
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, function (err) {
    return Promise.reject(err)
});

export default api