import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import dayjs from "dayjs";

const accessToken = localStorage.getItem('token') || "";
const refresh_token = localStorage.getItem('refresh_token') || "";

console.log('access: ', accessToken);
const baseURL = 'http://localhost:8000/api/';

const apiCreateProduct = axios.create({
    baseURL: baseURL,
    headers: { 
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "multipart/form-data",
    },
});

apiCreateProduct.interceptors.request.use(async req => {
    if (accessToken) {
        req.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
        const user = jwt_decode(accessToken);
        const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;
        if (!isExpired) return req;
        const resp = await axios.post(`${baseURL}token/refresh/`, {
            refresh: refresh_token
        });
        console.log('new_accesstoken: ', resp.data.access);
        localStorage.setItem('token', resp.data.access);
        req.headers.Authorization = `Bearer ${resp.data.access}`;
        return req;
    } else {
        req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : "";
        return req;
    }
});
export default apiCreateProduct;
