import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3130/api",
	timeout: 1000,
});

const sysInstance = axios.create({
	baseURL: "http://localhost:3130/",
	timeout: 1000,
});

export { sysInstance };
export default instance;
