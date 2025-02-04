import axios from "axios";

const baseURL =  `${window.location.protocol}//${window.location.host}/api/`;

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
