import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: {
            ...axiosInstance.defaults.headers,
            ...headers
        },
        params: params ? params : null,
        withCredentials: true
    });
}
