import axios from "axios";

const baseURL = "https://biopilates.fr/api/";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
