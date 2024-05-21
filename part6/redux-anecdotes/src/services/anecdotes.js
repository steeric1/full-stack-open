import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (content) => {
    const payload = { content, votes: 0 };
    const response = await axios.post(baseUrl, payload);

    return response.data;
};

const vote = async (id) => {
    const { data: current } = await axios.get(`${baseUrl}/${id}`);
    const { data } = await axios.patch(`${baseUrl}/${id}`, {
        votes: current.votes + 1,
    });

    return data;
};

export default { getAll, create, vote };
