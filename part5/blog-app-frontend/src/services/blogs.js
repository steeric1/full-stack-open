import axios from "axios";
const baseUrl = "/api/blogs";

let authToken = null;

const setToken = (token) => {
    authToken = `Bearer ${token}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: authToken },
    };

    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};

export default { getAll, setToken, create };
