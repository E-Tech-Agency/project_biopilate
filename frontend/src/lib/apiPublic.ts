import axios from "axios";

const baseURL = "https://www.biopilates.fr/api/";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
