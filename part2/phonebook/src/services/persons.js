import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getData = (promise) => promise.then((response) => response.data);

const getAll = () => getData(axios.get(baseUrl));

const create = (newObject) => getData(axios.post(baseUrl, newObject));

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

const exportedObject = { getAll, create, remove };

export default exportedObject;
